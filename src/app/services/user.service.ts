import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

import { map } from "rxjs/operators";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/account/login/`,
      new HttpParams({ fromObject: { jmeno_uzivatel: username, heslo: password } }), {
        headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
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
