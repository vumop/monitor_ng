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

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        const status = err.status;
        const error = err.error.message || err.statusText;
        console.error("status, error msg, interceptor --->", status, error);
        return throwError(error);
      }),
      tap(result => {
        console.log("interceptor --->", result);
      })
    );
  }
}
