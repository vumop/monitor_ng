import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { MatDialog } from "@angular/material";

import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Subject } from "rxjs/Subject";

import { MapService } from "../../services/map.service";
import { LayersService } from "../../services/layers.service";
import { IncidentLayer } from "./../incident/incident-layer/incident.layer";
import { Layers } from "./layers/layers";

import { IncidentDetailComponent } from "../incident/incident-detail/incident-detail.component";
import { UserState } from "./../../state/user.state";
import { SelectModel } from "./../../models/select.model";

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

  public selector: SelectModel;

  constructor(
    private mapService: MapService,
    private layersService: LayersService,
    private store: Store,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private incidetnLayer: IncidentLayer,
    private layers: Layers
  ) {
    this.subscription.push(
      this.sideType$.subscribe(val => (this.drawerType = val))
    );
    this.selector = new SelectModel(
      this.layersService.getVectorLayer("incident_vector").olLayer
    );
  }

  ngOnInit() {
    this.mapService.getMap().setTarget(null);

    this.selector.activate(this.mapService.getMap());
    this.selector.select.on("select", obj => {
      obj.selected.forEach(feat => {
        // show incident detail
        this.router.navigate([`map/${feat.getId()}`]);
      });
    });

    this.subscription.push(
      this.selectedIsLoggend.subscribe(val => {
        this.isLogged = val;
      })
    );
    setTimeout(() => {
      this.mapService.getMap().setTarget("map");
    });
  }

  ngAfterViewInit() {
    const id = this.route.snapshot.paramMap.get("id");
    setTimeout(() => {
      if (id) {
        // zoom to the feature incident
        const feat = this.layersService
          .getVectorLayer("incident_vector")
          .olLayer.getSource()
          .getFeatureById(id);
        this.mapService.zoomToFeature(feat);
        // show incident detail
        this.dialog.open(IncidentDetailComponent, {
          data: { id_incident: id, navigateTo: "map" }
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.map(sub => sub.unsubscribe());
    this.selector.select.getFeatures().clear();
    delete this.selector;
  }
}
