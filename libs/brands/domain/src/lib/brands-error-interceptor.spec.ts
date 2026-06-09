import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { throwError } from 'rxjs';
import { BrandErrorInterceptor } from './brands-error-interceptor';

describe('brand BrandErrorInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => BrandErrorInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should handle 400 error', (done) => {
    const req = new HttpRequest('GET', '/api/test');

    const errorResponse = new HttpErrorResponse({
      status: 400,
    });

    const next = {
      handle: jest.fn(() => throwError(() => errorResponse)),
    };

    BrandErrorInterceptor(req, next.handle as any).subscribe({
      error: (error) => {
        expect(error.status).toEqual(400);
        done();
      },
    });
  });

  it('should handle 401 error', (done) => {
    const req = new HttpRequest('GET', '/api/test');

    const errorResponse = new HttpErrorResponse({
      status: 401,
    });

    const next = {
      handle: jest.fn(() => throwError(() => errorResponse)),
    };

    BrandErrorInterceptor(req, next.handle as any).subscribe({
      error: (error) => {
        expect(error.status).toEqual(401);
        done();
      },
    });
  });

  it('should handle 404 error', (done) => {
    const req = new HttpRequest('GET', '/api/test');

    const errorResponse = new HttpErrorResponse({
      status: 404,
    });

    const next = {
      handle: jest.fn(() => throwError(() => errorResponse)),
    };

    BrandErrorInterceptor(req, next.handle as any).subscribe({
      error: (error) => {
        expect(error.status).toEqual(404);
        done();
      },
    });
  });

  it('should handle 500 error', (done) => {
    const req = new HttpRequest('GET', '/api/test');

    const errorResponse = new HttpErrorResponse({
      status: 500,
    });

    const next = {
      handle: jest.fn(() => throwError(() => errorResponse)),
    };

    BrandErrorInterceptor(req, next.handle as any).subscribe({
      error: (error) => {
        expect(error.status).toEqual(500);
        done();
      },
    });
  });
});
