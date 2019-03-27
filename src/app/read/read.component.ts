import { Component, OnInit } from "@angular/core";

import { Store, Select } from "@ngxs/store";
import { Incident } from "./../models/incident.model";
import { IncidentState } from "./../state/incident.state"; // We will use this shortly
import { Observable } from "rxjs/Observable";
import { RemoveIncident } from "./../actions/incident.actions";

@Component({
  selector: "app-read",
  templateUrl: "./read.component.html",
  styleUrls: ["./read.component.css"]
})
export class ReadComponent implements OnInit {
  Incidents$: Observable<Incident>;

  constructor(private store: Store) {
    this.Incidents$ = this.store.select(state => state.Incidents.Incidents);
  }

  delIncident(name) {
    this.store.dispatch(new RemoveIncident(name));
  }

  ngOnInit() {}
}
