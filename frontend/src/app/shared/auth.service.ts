import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService implements HttpInterceptor {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let auth = ''; // environment.TOKEN;
    if (isPlatformBrowser(this.platformId)) {
      auth = localStorage.getItem('token');
    }
    req = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${auth}`
      }
    });
    return next.handle(req);
  }
}
