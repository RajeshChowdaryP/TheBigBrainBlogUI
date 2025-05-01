import { HttpInterceptorFn } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) { }

  // Intercept all HTTP requests and add the Authorization header if the token is available
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.cookieService.get('Authorization'); // Get the token from cookies
    if (token && this.addAuthHeader(request)) { // Check if the token exists and if the request needs the Authorization header
      const authRequest = request.clone({
        setHeaders: {
          'Authorization': `${token}`, // Add the token to the Authorization header
        },
      });
      return next.handle(authRequest); // Pass the modified request to the next handler
    }
    return next.handle(request); // If no token, pass the original request
  }

  private addAuthHeader(request: HttpRequest<any>): boolean {
    // return request.url.includes('addAuth=true'); // Check if the request URL contains the addAuth query parameter
    return request.urlWithParams.includes('addAuth=true'); // Check if the request URL contains the addAuth query parameter
  }
}
