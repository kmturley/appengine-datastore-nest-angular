import { ApplicationRef, NgModuleFactory, NgModuleRef, PlatformRef, StaticProvider, Type } from '@angular/core';
import { ɵTRANSITION_ID } from '@angular/platform-browser';
import { first } from 'rxjs/operators';

import { BEFORE_APP_SERIALIZED, INITIAL_CONFIG, platformDynamicServer, platformServer, PlatformState } from '@angular/platform-server';

interface PlatformOptions {
  document?: string;
  url?: string;
  extraProviders?: StaticProvider[];
}

function _getPlatform(
    platformFactory: (extraProviders: StaticProvider[]) => PlatformRef,
    options: PlatformOptions): PlatformRef {
  const extraProviders = options.extraProviders ? options.extraProviders : [];
  return platformFactory([
    {provide: INITIAL_CONFIG, useValue: {document: options.document, url: options.url}},
    extraProviders
  ]);
}

function _render<T>(
    platform: PlatformRef, moduleRefPromise: Promise<NgModuleRef<T>>): Promise<object> {
  return moduleRefPromise.then((moduleRef) => {
    const transitionId = moduleRef.injector.get(ɵTRANSITION_ID, null);
    if (!transitionId) {
      throw new Error(
          `renderModule[Factory]() requires the use of BrowserModule.withServerTransition() to ensure
the server-rendered app can be properly bootstrapped into a client app.`);
    }
    const applicationRef: ApplicationRef = moduleRef.injector.get(ApplicationRef);
    return applicationRef.isStable.pipe((first((isStable: boolean) => isStable)))
        .toPromise()
        .then(() => {
          const platformState = platform.injector.get(PlatformState);

          // Run any BEFORE_APP_SERIALIZED callbacks just before rendering to string.
          const callbacks = moduleRef.injector.get(BEFORE_APP_SERIALIZED, null);
          let data = null;
          if (callbacks) {
            for (const callback of callbacks) {
              try {
                data = callback();
              } catch (e) {
                // Ignore exceptions.
                console.warn('Ignoring BEFORE_APP_SERIALIZED Exception: ', e);
              }
            }
          }
          const output = platformState.renderToString();
          platform.destroy();
          return {
            output: output,
            data: data
          };
        });
  });
}

export function renderModule<T>(
    module: Type<T>, options: {document?: string, url?: string, extraProviders?: StaticProvider[]}):
    Promise<object> {
  const platform = _getPlatform(platformDynamicServer, options);
  return _render(platform, platform.bootstrapModule(module));
}

export function renderModuleFactory<T>(
    moduleFactory: NgModuleFactory<T>,
    options: {document?: string, url?: string, extraProviders?: StaticProvider[]}):
    Promise<object> {
  const platform = _getPlatform(platformServer, options);
  return _render(platform, platform.bootstrapModuleFactory(moduleFactory));
}
