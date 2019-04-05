import { State, Action, StateContext, Selector } from "@ngxs/store";
import { Logout, Login } from "./../actions/user.actions";
import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service";
import { tap } from "rxjs/operators";

@State<UserModel>({
  name: "User",
  defaults: {
    token: "",
    username: "Host"
  }
})
export class UserState {
  @Selector()
  static token(state: UserModel) {
    return state.token;
  }

  constructor(private userService: UserService) {}

  @Action(Login)
  login({ patchState }: StateContext<UserModel>, { username, password }: Login) {
    return this.userService.login(username, password).pipe(
      tap((result: { token: string }) => {

        console.log(result);

        patchState({ token: "sdf", username: "jirka" });
      })
    );
  }

  @Action(Logout)
  logout({ setState, getState }: StateContext<UserModel>) {
    const { token } = getState();
    return this.userService.logout();
  }
}
