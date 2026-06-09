import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((e: HttpErrorResponse) => {
      switch (e.status) {
        case 0:
          console.log('Network or CORS error');
          break;

        case 400:
          console.log('Bad Request');
          break;

        case 401:
          console.log('Unauthorized');
          break;

        case 403:
          console.log('Forbidden');
          break;

        case 404:
          console.log('Not Found');
          break;

        case 500:
          console.log('Server Error');
          break;
      }
      return throwError(() => e);
    }),
  );
