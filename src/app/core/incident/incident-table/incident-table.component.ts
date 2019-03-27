import { Component, OnInit } from "@angular/core";

import { Store, Select } from "@ngxs/store";
import { Observable } from "rxjs/Observable";
import { Tutorial } from "./../../../models/tutorial.model";
import { TutorialState } from "./../../../state/tutorial.state"; // We will use this shortly
import { RemoveTutorial } from "./../../../actions/tutorial.actions";


@Component({
  selector: "app-incident-table",
  templateUrl: "./incident-table.component.html",
  styleUrls: ["./incident-table.component.css"]
})
export class IncidentTableComponent {

  displayedColumns: string[] = ["name"];
  tutorials$: Observable<Tutorial>;

  constructor(private store: Store) {
    this.tutorials$ = this.store.select(state => state.tutorials.tutorials);
  }
}
