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
  constructor() { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const users: any[] = [
      {
        username: "jirka",
        password: "heslo"
      }
    ];

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

              return of(new HttpResponse({ status: 200, body }));
            } else {
              return throwError({
                error: { message: "Username or password is incorrect" }
              });
            }
          }

          if (
            request.url.endsWith("/users/lostPass") &&
            request.method === "POST"
          ) {
            const body = {
              email: request.body.email
            };
            return of(new HttpResponse({ status: 200, body }));
          }

          if (
            request.url.endsWith("/incident/new/") &&
            request.method === "POST"
          ) {
            const body = {
              id: 9999,
              success: true,
              msg: "Byla uložena nová událost",
            };
            return of(new HttpResponse({ status: 200, body }));
          }

          if (
            request.url.endsWith("/incident/foto-save/") &&
            request.method === "POST"
          ) {
            const body = {
              success: true,
              uploaded_file: "uploaded file",
              msg: "soubor uložen.",
            };
            return of(new HttpResponse({ status: 200, body }));
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
