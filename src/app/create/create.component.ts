import { Component, OnInit } from "@angular/core";

import { Store } from "@ngxs/store";
import { AddIncident } from "./../actions/incident.actions";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"]
})
export class CreateComponent implements OnInit {
  constructor(private store: Store) {}

  addIncident(nazev, id) {
    this.store.dispatch(
      new AddIncident({
        id: id,
        misto_nazev: nazev
      })
    );
  }

  ngOnInit() {}
}
