import { Component, OnInit } from "@angular/core";

import { Store } from "@ngxs/store";

import { GetIncident } from "./actions/incident.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetIncident());
  }
}
