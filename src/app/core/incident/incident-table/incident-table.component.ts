import { Component, OnInit, ViewChild } from "@angular/core";

import { Store, Select } from "@ngxs/store";
import { Observable } from "rxjs/Observable";
import { Incident } from "./../../../models/incident.model";
import { IncidentState } from "./../../../state/incident.state"; // We will use this shortly
import {
  RemoveIncident,
  GetIncident
} from "./../../../actions/incident.actions";

import { MatSort, MatTableDataSource, MatPaginator } from "@angular/material";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
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

  incidents$: MatTableDataSource<Incident>;

  constructor(private store: Store) {
    //https://stackoverflow.com/questions/49995159/mat-table-datasource-using-ngrx-store-effects
    this.store
      .select(state => state.Incidents.Incidents)
      .subscribe(arr => {
        this.incidents$ = new MatTableDataSource(arr);
        this.incidents$.sort = this.sort;
        this.incidents$.paginator = this.paginator;
      });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.store.dispatch(new GetIncident());
  }
}
