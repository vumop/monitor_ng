import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

import "rxjs/add/operator/do";
import { interceptingHandler } from '@angular/common/http/src/module';
import { MatSnackBar } from '@angular/material';

interface ServerResponse {
  data?: any;
  success?: boolean;
  msg?: string;
}

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private snackBar: MatSnackBar
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // const token: string = localStorage.getItem('token');

    // if (token) {
    //     request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
    // }
    //request = request.clone({ headers: request.headers.set('Authorization', 'origin, x-requested-with') });
    


    // if (!request.headers.has('Content-Type')) {
    //     request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    // }
    // request = request.clone({ headers: request.headers.set('Accept', 'application/json') });


    return next.handle(request).
    pipe(
      catchError(err => {
        const status = err.status;
        const error = err.error.message || err.statusText;
        console.error("status, error msg, interceptor --->", status, error);
        return throwError(error);
      }),
      tap(result => {
        const res = result['body'] as ServerResponse;
        if (res && res.success === false) {
          this.snackBar.open("Zpráva", `${res.msg}`, {
            duration: 3500
          });
        }
      })
    );
  }
}
