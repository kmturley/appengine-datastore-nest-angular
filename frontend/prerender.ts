// Load zone.js for the server.
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import {readFileSync, writeFileSync, existsSync, mkdirSync} from 'fs';
import {join} from 'path';

import {enableProdMode} from '@angular/core';
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';
import {renderModuleFactory} from './utils';
import {getPaths} from './static.paths';

const shell = require('shelljs');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./server/main');

const BROWSER_FOLDER = join(process.cwd(), 'browser');

// Load the index.html file containing referances to your application bundle.
const index = readFileSync(join('browser', 'index.html'), 'utf8');

let previousRender = Promise.resolve();


getPaths().then((ROUTES: any[]) => {
  // create json folder
  const jsonFolder = join(BROWSER_FOLDER, 'json');
  if (!existsSync(jsonFolder)) {
    console.log('+', jsonFolder);
    shell.mkdir('-p', jsonFolder);
  }

  // Iterate each route path
  ROUTES.forEach(route => {
    const routeFolder = join(BROWSER_FOLDER, route);

    // Make sure the directory structure is there
    if (!existsSync(routeFolder)) {
      console.log('+', routeFolder);
      shell.mkdir('-p', routeFolder);
    }

    // Writes rendered HTML to index.html, replacing the file if it already exists.
    previousRender = previousRender.then(_ => renderModuleFactory(AppServerModuleNgFactory, {
      document: index,
      url: route,
      extraProviders: [
        provideModuleMap(LAZY_MODULE_MAP)
      ]
    })).then((res: { output: string, data: object }) => {
      // write html file
      const htmlFile = join(routeFolder, 'index.html');
      console.log('+', htmlFile);
      writeFileSync(htmlFile, res.output);

      // write json files from TransferState objects
      Object.keys(res.data).forEach(jsonKey => {
        // TODO find out why original url is still returned
        if (!jsonKey.includes('http')) {
          const jsonFile = join(jsonFolder, `${jsonKey}.json`);
          if (!existsSync(jsonFile)) {
            console.log('+', jsonFile);
            writeFileSync(jsonFile, JSON.stringify(res.data[jsonKey]));
          }
        }
      });
    });
  });
});
