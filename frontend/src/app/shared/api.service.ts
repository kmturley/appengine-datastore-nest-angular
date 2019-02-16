import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  data = {};

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private http: HttpClient,
    private transferState: TransferState,
  ) { }

  // get(path) {
  //   return this.http.get(`${environment.apiUrl}/${path}`);
  // }

  get(url: string, id: string): Observable<any> {
    console.log('api.get', url, id);
    const key = makeStateKey(id);
    if (this.data[id] && isPlatformBrowser(this.platformId)) {
      console.log('api.get.data');
      return of(this.data[id]);
    } else if (this.transferState.hasKey(key)) {
      console.log('api.get.transferState');
      const item = this.transferState.get(key, null);
      return of(item);
    } else {
      console.log('api.get.http');
      if (environment.production && isPlatformBrowser(this.platformId)) {
        url = `./json/${id}.json`;
      }
      return this.http.get(url).pipe(
        map(items => {
          this.data[id] = items;
          this.transferState.set(key, items);
          return items;
        })
      );
    }
  }

  post(url, data) {
    return this.http.post(url, data);
  }
}
