import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay, mergeMap, materialize, dematerialize } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class FakeBackendService implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {


    /**
     * 
     * http://jasonwatmore.com/post/2018/05/16/angular-6-user-registration-and-login-example-tutorial#alert-service-ts
     * 
     */


    console.log("Fake backend - request.url", request.url);

    console.log("FakeBackendService request.method", request.method);

    console.log("FakeBackendService request.body", request.body);

    const users: any[] = JSON.parse(localStorage.getItem("users")) || [];

    return of(null)
      .pipe(
        mergeMap(() => {
          if (
            request.url.endsWith("/users/authenticate") &&
            request.method === "POST"
          ) {
            const filteredUsers = users.filter(user => {
              return (
                user.username === request.body.username &&
                user.password === request.body.password
              );
            });

            if (filteredUsers.length) {
              const user = filteredUsers[0];
              const body = {
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: "fake-jwt-token"
              };

              return of(new HttpResponse({ status: 200, body: body }));
            } else {
              return throwError({
                error: { message: "Username or password is incorrect" }
              });
            }
          }
          return next.handle(request);
        })
      )
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());
  }
}

export let FakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendService,
  multi: true
};
