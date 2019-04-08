import { Component, OnInit } from "@angular/core";

import { Store, Select } from "@ngxs/store";
import { Observable } from "rxjs";

import { UserState } from "./../../state/user.state";
import { Logout } from '../../actions/user.actions';


@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit {
  @Select(UserState.isLoggend) selectedIsLoggend: Observable<boolean>;

  public title: string;

  public userName: string;

  public isLogged: boolean;

  constructor(private store: Store) {
    this.title = "Mapování eroze";
  }

  ngOnInit() {
    this.selectedIsLoggend.subscribe(val => {
      this.isLogged = val;
    });

    this.store
      .select(state => state.User.username)
      .subscribe(value => {
        this.userName = value;
      });
  }

  public logout(): void {
    this.store.dispatch(new Logout());
  }
}
