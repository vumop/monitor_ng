import { State, Action, StateContext, Selector } from "@ngxs/store";

import { Logout, Login, LostPass } from "./../actions/user.actions";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";
import { tap, first, catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

@State<UserModel>({
  name: "User",
  defaults: {
    token: "",
    username: "Host",
    isLogged: false
  }
})
export class UserState {
  @Selector()
  static token(state: UserModel) {
    return state.token;
  }

  @Selector()
  static isLoggend(state: UserModel) {
    return state.isLogged;
  }

  constructor(private userService: UserService) { }

  @Action(Login)
  login(
    { patchState }: StateContext<UserModel>,
    { username, password }: Login
  ) {
    return this.userService
      .login(username, password)
      .pipe(first())
      .subscribe(
        result => {
          if (result.success) {
            patchState({
              token: result.id,
              username: result.jmeno_uzivatel,
              isLogged: true
            });
          }
        },
        err => {
          alert(err);
        }
      );
  }

  @Action(Logout)
  logout({ setState, getState, patchState }: StateContext<UserModel>) {
    const { token } = getState();
    patchState({ token: "", username: "Host", isLogged: false });
    this.userService.logout();
  }

  @Action(LostPass)
  lostPass(
    { setState, getState, patchState }: StateContext<UserModel>,
    { email }: LostPass
  ) {
    this.userService
      .lostPass(email)
      .pipe(first())
      .subscribe(
        result => {
          console.log(result);
        },
        err => {
          alert(err);
        }
      );
  }
}
