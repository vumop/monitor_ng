import { Component, OnInit, ViewChild } from "@angular/core";

import { Store, Select } from "@ngxs/store";
import { Observable } from "rxjs/Observable";
import { Incident } from "./../../../models/incident.model";
import { IncidentState } from "./../../../state/incident.state"; // We will use this shortly
import {
  RemoveIncident,
  GetIncident
} from "./../../../actions/incident.actions";

import { MatSort, MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-incident-table",
  templateUrl: "./incident-table.component.html",
  styleUrls: ["./incident-table.component.css"]
})
export class IncidentTableComponent {
  displayedColumns: string[] = [
    "id",
    "misto_nazev",
    "datum_vzniku_od",
    "typ_eroze",
    "opakovana"
  ];
  incidents$: Observable<Incident>;

  dataSource = new MatTableDataSource([
    { position: 1, name: "Hydrogen", weight: 1.0079, symbol: "H" },
    { position: 2, name: "Helium", weight: 4.0026, symbol: "He" }
  ]);

  constructor(private store: Store) {

    this.store.dispatch(new GetIncident());

    this.incidents$ = this.store.select(state => state.Incidents.Incidents);

    //https://stackoverflow.com/questions/49995159/mat-table-datasource-using-ngrx-store-effects
    
    /*
    this.store.select(state => state.Incidents.Incidents).subscribe(arr => {
      console.log("fromStore.getAllEmp: " + arr);
    });
    */


    console.log('incident table',this.incidents$);

  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
}
