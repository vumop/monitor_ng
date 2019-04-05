import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";

import { default as ApiConfig } from "../config/api"; //import  ApiConfig from "../config/api";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(user: string, pass: string) {
    return this.http
      .post<any>(`${ApiConfig.apiUrl}/users/authenticate`, {
        username: user,
        password: pass
      })
      .pipe(
        map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem("currentUser", JSON.stringify(user));
          }

          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
  }
}
