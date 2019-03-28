import { Component, OnInit, ViewChild } from "@angular/core";

import { Store, Select } from "@ngxs/store";
import { Observable } from "rxjs/Observable";
import { Incident } from "./../../../models/incident.model";
import {
  GetIncident,
  PageIncident,
  SortIncident
} from "./../../../actions/incident.actions";

import { MatSort, MatTableDataSource, MatPaginator } from "@angular/material";

@Component({
  selector: "app-incident-table",
  templateUrl: "./incident-table.component.html",
  styleUrls: ["./incident-table.component.css"]
})
export class IncidentTableComponent {
  private displayedColumns: string[] = [
    "id",
    "misto_nazev",
    "datum_vzniku_od",
    "typ_eroze",
    "opakovana",
    "delete"
  ];

  private incidents$: MatTableDataSource<Incident>;
  private sortState;
  private pageState;

  constructor(private store: Store) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    // https://stackoverflow.com/questions/49995159/mat-table-datasource-using-ngrx-store-effects
    this.store
      .select(state => state.Incidents)
      .subscribe(data => {
        console.log("Incident", data);
        if (!data.incidents.length) {
          this.store.dispatch(new GetIncident());
        }

        this.incidents$ = new MatTableDataSource(data.incidents);
        this.incidents$.sort = this.sort;
        this.incidents$.paginator = this.paginator;

        this.sortState = data.sort;
        this.pageState = data.page;
      });

    this.store
      .select(state => state.Incidents.incident)
      .subscribe(data => {
        console.log("Incident.incident", data);
      });

    this.store.subscribe(data => {
      console.log("no select Incident.incident", data);
    });
  }

  public changeSort($event): void {
    this.store.dispatch(new SortIncident($event));
  }

  public changePage = ($event: Event) => {
    this.store.dispatch(new PageIncident($event));
  }
}
