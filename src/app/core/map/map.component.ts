import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { MapService } from "../../services/map.service";
import { MatDialog } from "@angular/material";

import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Subject } from "rxjs/Subject";

import { UserState } from "./../../state/user.state";
import { IncidentDetailComponent } from "../incident/incident-detail/incident-detail.component";
@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @Select(UserState.isLoggend) selectedIsLoggend: Observable<boolean>;

  public isLogged: boolean;

  public sideType$ = new Subject<string>();
  public drawerType: string;
  private subscription = [];

  constructor(
    private mapService: MapService,
    private store: Store,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.subscription.push(
      this.sideType$.subscribe(val => (this.drawerType = val))
    );
  }

  ngOnInit() {
    this.mapService.getMap().setTarget(null);

    this.subscription.push(
      this.selectedIsLoggend.subscribe(val => {
        this.isLogged = val;
      })
    );
  }

  ngAfterViewInit() {
    const id = this.route.snapshot.paramMap.get("id");
    setTimeout(() => {
      this.mapService.getMap().setTarget("map");
      if (id) {
        this.dialog.open(IncidentDetailComponent, {
          data: { id_incident: id, navigateTo: "map" }
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.map(sub => sub.unsubscribe());
  }
}
