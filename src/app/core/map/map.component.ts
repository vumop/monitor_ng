import { Component, OnInit, AfterViewInit } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { MapService } from "../../services/map.service";
import { MatDialog } from "@angular/material";

import { ActivatedRoute } from "@angular/router";
import { IncidentDetailComponent } from "../incident/incident-detail/incident-detail.component";
@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit, AfterViewInit {
  constructor(
    private mapService: MapService,
    private store: Store,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.mapService.getMap().setTarget(null);
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
}
