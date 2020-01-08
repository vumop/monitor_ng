import { Component, OnInit, AfterViewInit, OnDestroy } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";

import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs/Subject";
import { Observable } from 'rxjs/internal/Observable';
import { Select } from '@ngxs/store';

import { MapService } from "../../services/map.service";
import { LayersService } from "../../services/layers.service";
import { DrawingService } from "../../services/drawing.service";
import { IncidentLayer } from "./../incident/incident-layer/incident.layer";
import { Layers } from "./layers/layers";

import { IncidentDetailComponent } from "../incident/incident-detail/incident-detail.component";
import { IncidentCreateInfoComponent } from "../incident/incident-create-info/incident-create-info.component";
import { SelectModel } from "./../../models/select.model";
import { UserState } from '../../state/user.state';

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  @Select(UserState.isLoggend) selectedIsLoggend: Observable<boolean>;

  public sideType$ = new Subject<string>();
  public drawerType: string;
  private subscription = [];
  public selector: SelectModel;
  public isLogged: boolean;

  constructor(
    private mapService: MapService,
    private layersService: LayersService,
    private drawingService: DrawingService,
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
    this.selectActivation();
    this.selectedIsLoggend.subscribe(val => {
      this.isLogged = val;
    });
  }

  ngAfterViewInit() {
    this.mapService.getMap().setTarget("map");

    const id = this.route.snapshot.paramMap.get("id");
    setTimeout(() => {
      if (id) {
        // zoom to the feature incident
        this.mapService.zoomToFeature(
          this.layersService
            .getVectorLayer("incident_vector")
            .olLayer.getSource()
            .getFeatureById(id)
        );
        // show incident detail
        this.dialog.open(IncidentDetailComponent, {
          data: { id_incident: id, navigateTo: "map" }
        });
      }
      /**
       * Create the new incident
       */
      if (this.route.snapshot.routeConfig.path === "incident/create") {
        this.dialog.open(IncidentCreateInfoComponent, {
          disableClose: true,
          data: {
            selectDeactivation: this.selectDeactivation,
            selectActivation: this.selectActivation,
            navigateTo: "map"
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.map(sub => sub.unsubscribe());
    this.selectDeactivation();
    delete this.selector;
  }

  private selectActivation = () => {
    this.selector.activate(this.mapService.getMap());
    this.selector.select.on("select", obj => {
      obj.selected.forEach(feat => {
        // show incident detail
        this.router.navigate([`map/detail/${feat.getId()}`]);
      });
    });
  }

  private selectDeactivation = () => {
    this.selector.deactivate();
  }
}
