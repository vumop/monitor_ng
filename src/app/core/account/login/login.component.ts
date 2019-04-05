import { Component, OnInit } from "@angular/core";

import { Store, Select } from "@ngxs/store";

import { Login } from "./../../../actions/user.actions";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new Login('pok', 'test'));
  }
}
