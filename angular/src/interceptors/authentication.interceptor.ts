import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/app/service/auth/auth.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('accessToken');
    let request = req;

    if (accessToken) {
      request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          this.router.navigate(['/login']);
          return throwError(() => new Error('Bejelentkezés szükséges'));
        } else if (err.status === 403) {
          return this.handle403Error(request, next);
        } else if (err.status === 400) {
          return throwError(
            () => new Error('Rossz felhasználónév vagy jelszó')
          );
        } else {
          return throwError(() => new Error('Valami hiba történt'));
        }
      })
    );
  }

  handle403Error(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return this.authService.refresh().pipe(
      switchMap((tokenData) => {
        const newRequest = req.clone({
          headers: req.headers.set(
            'Authorization',
            `Bearer ${tokenData.accessToken}`
          ),
        });

        return next.handle(newRequest);
      })
    );
  }
}
