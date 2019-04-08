import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";

import { default as ApiConfig } from "../config/api"; //import  ApiConfig from "../config/api";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>(`/users/authenticate`, {
      username,
      password
    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
  }

  lostPass(email: string) {
    return this.http.post<any>(`/users/lostPass`, {
      email
    });
  }
}
