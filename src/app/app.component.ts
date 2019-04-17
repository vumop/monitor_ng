import { Component, OnInit } from "@angular/core";

import { Store, Select } from "@ngxs/store";
import { Observable } from "rxjs";

import { GetIncident } from "./actions/incident.actions";
import { GetLayers } from "./actions/map.actions";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new GetIncident());

    this.store.dispatch(new GetLayers());
  }
}
