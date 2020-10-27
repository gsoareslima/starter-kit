import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';

/**
 * Prefixes all requests not starting with `http[s]` with `environment.chuckNorrisServerUrl`.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiPrefixInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (/^\/?chuckNorris\//i.test(request.url)) {
      let chuckNorrisUrl = request.url.replace(/\/?chuckNorris/, '');
      request = request.clone({ url: environment.chuckNorrisServerUrl + chuckNorrisUrl });
    } else if (/^\/?github\//i.test(request.url)) {
      let githubUrl = request.url.replace(/\/?github/, '');
      request = request.clone({ url: environment.github.url.api + githubUrl });
    }
    return next.handle(request);
  }
}
