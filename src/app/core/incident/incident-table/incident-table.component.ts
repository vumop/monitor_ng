import { Component, OnInit, ViewChild } from "@angular/core";

import { Store, Select } from "@ngxs/store";
import { Observable } from "rxjs/Observable";
import { take } from "rxjs/operators";
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
export class IncidentTableComponent implements OnInit {
  private displayedColumns: string[] = [
    "id",
    "misto_nazev",
    "datum_vzniku_od",
    "typ_eroze",
    "opakovana",
    "zoom"
  ];

  private incidents: MatTableDataSource<Incident>;
  private sortState;
  private pageState;
  private loading: boolean;

  constructor(private store: Store) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.store
      .select(state => state.Incidents.loading)
      .subscribe(data => {
        this.loading = data;
      });

    this.store
      .select(state => state.Incidents)
      .subscribe(data => {
          this.incidents = new MatTableDataSource(data.incidents);
          this.incidents.sort = this.sort;
          this.incidents.paginator = this.paginator;
          this.sortState = data.sort;
          this.pageState = data.page;
      });
  }

  public changeSort($event): void {
    this.store.dispatch(new SortIncident($event));
  }

  public changePage = ($event: Event) => {
    this.store.dispatch(new PageIncident($event));
  };

  public toZoom = evt => {
    console.log("zoom", evt);
  }

  public applyFilter(filterValue: string) {
    this.incidents.filter = filterValue.trim().toLowerCase();
  }
}
