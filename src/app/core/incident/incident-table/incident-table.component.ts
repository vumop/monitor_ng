import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild
} from "@angular/core";

import {
  MatSort,
  MatTableDataSource,
  MatPaginator,
  MatDialog
} from "@angular/material";

import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { Store, Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { Subject } from "rxjs/Subject";
import { take, debounceTime, distinctUntilChanged } from "rxjs/operators";

import { Incident } from "./../../../models/incident.model";
import {
  GetIncident,
  PageIncident,
  SortIncident,
  FilterIncident
} from "./../../../actions/incident.actions";
import {
  IncidentState,
  IncidentStateModel
} from "./../../../state/incident.state";

import { UserState } from "./../../../state/user.state";

import { IncidentDetailComponent } from "../incident-detail/incident-detail.component";

@Component({
  selector: "app-incident-table",
  templateUrl: "./incident-table.component.html",
  styleUrls: ["./incident-table.component.css"]
})
export class IncidentTableComponent
  implements OnInit, AfterViewInit, OnDestroy {

  @Select(IncidentState.getIncidents) selectedIncidents: Observable<
    IncidentStateModel
  >;

  public displayedColumns: string[] = [
    "id",
    "datum_vzniku_od",
    "misto_nazev",
    "typ_eroze",
    "opakovana",
    "zoom"
  ];

  public incidents = new MatTableDataSource<Incident>();
  private defaultFilter;
  public sortState;
  public pageState;
  public loading: boolean;
  private searchTextChanged = new Subject<string>();
  private subscription = [];
  public filterForm: FormGroup;

  constructor(
    private store: Store,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.filterForm = new FormGroup({
      filterDate: new FormControl(null),
      searchText: new FormControl("")
    });

    this.searchTextChanged
      .pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe(val => this.applyFilter(val));
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.defaultFilter = this.incidents.filterPredicate;
    this.incidents.sort = this.sort;
    this.incidents.paginator = this.paginator;

    this.selectedIncidents.subscribe(data => {
      this.loading = data.loading;
      this.incidents.data = data.incidents.map(res => new Incident(res));
      this.sortState = data.sort;
      this.pageState = data.page;
    });

    this.subscription.push(
      this.store
        .select(state => state.Incidents.filter.date)
        .subscribe(value => {
          this.filterForm.patchValue({
            filterDate: value
          });
          this.incidents.filterPredicate = (data, filter) => {
            return new Date(data.getDatumVzniku()) > value;
          };
          this.incidents.filter = value ? value.toString() : null;
        })
    );

    this.subscription.push(
      this.store
        .select(state => state.Incidents.filter.district)
        .subscribe(value => {
          this.filterForm.patchValue({
            searchText: value
          });
          this.incidents.filterPredicate = this.defaultFilter;
          this.incidents.filter = value.trim().toLowerCase();
        })
    );
  }

  ngAfterViewInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      setTimeout(() => this.openDialog(Number(id)));
    }
  }

  ngOnDestroy() {
    this.subscription.map(sub => sub.unsubscribe());
  }

  public changeSort($event): void {
    this.store.dispatch(new SortIncident($event));
  }

  public changePage = ($event: Event) => {
    this.store.dispatch(new PageIncident($event));
  };

  public searchDistrict(filterValue: string) {
    this.searchTextChanged.next(filterValue);
  }

  public applyFilter(filterValue: string) {
    this.store.dispatch(new FilterIncident(filterValue, "district"));
  }

  public applyDateFilter(filterValue: Date) {
    this.store.dispatch(new FilterIncident(filterValue, "date"));
  }

  public openDialog(id: number) {
    this.dialog.open(IncidentDetailComponent, {
      data: { id_incident: id, navigateTo: "incident" }
    });
  }
}
