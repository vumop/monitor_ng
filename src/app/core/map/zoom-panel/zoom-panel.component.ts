import { Component, OnInit } from "@angular/core";

import OlGeolocation from "ol/Geolocation";
import OlGeomPoint from "ol/geom/Point";

import { MapService } from "./../../../services/map.service";

@Component({
  selector: "app-zoom-panel",
  templateUrl: "./zoom-panel.component.html",
  styleUrls: ["./zoom-panel.component.css"]
})
export class ZoomPanelComponent implements OnInit {
  private geolocation: OlGeolocation;

  constructor(private mapService: MapService) {
    this.geolocation = new OlGeolocation();
    this.geolocation.setProjection(
      this.mapService
        .getMap()
        .getView()
        .getProjection()
    );
  }

  ngOnInit() {}

  public zoomIn = (): void => {
    const view = this.mapService.getMap().getView();
    view.animate({
      zoom: view.getZoom() + 1,
      duration: 200
    });
  };

  public zoomOut = (): void => {
    const view = this.mapService.getMap().getView();
    view.animate({
      zoom: view.getZoom() - 1,
      duration: 200
    });
  };

  public getPosition = (): void => {
    //
    this.geolocation.setTracking(true);
    //
    this.geolocation.once("change", e => {
      this.mapService
        .getMap()
        .getView()
        .fit(new OlGeomPoint(e.target.getPosition()), {
          size: this.mapService.getMap().getSize()
        });
      this.geolocation.setTracking(false);
    });
  };
}
