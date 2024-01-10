import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, concatMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes(`token`)) {
      return next.handle(request);
    }

    return this.authService.token.pipe(
      concatMap(token => {
        request = request.clone({
          setHeaders: {
            authorization: `Bearer ${token}`
          }
        })

        return next.handle(request);
      })
    )
  }
}
