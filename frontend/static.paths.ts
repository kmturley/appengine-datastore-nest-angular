// import { environment } from './src/environments/environment.prod';

// const request = require('request');
// const slugify = require('slugify');
const routes = ['/'];
// const req = request.defaults({
//   headers: {
//     'Authorization': `Bearer ${environment.token}`
//   }
// });

export function getPaths() {
  return new Promise((resolve, reject) => {
    resolve(routes);
    // req.get(`${environment.API_URL}${environment.SHEET_ID}?includeGridData=true`, (err, res, items) => {
    //   console.log('getPaths complete');
    //   if (err) { return reject(err); }
    //   items = JSON.parse(items);
    //   if (items['error']) { return reject(items); }
    //   resolve(routes);
    // });
  });
}
