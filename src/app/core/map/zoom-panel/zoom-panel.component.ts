import { Component, OnInit } from "@angular/core";

import { MapService } from "./../../../services/map.service";

@Component({
  selector: "app-zoom-panel",
  templateUrl: "./zoom-panel.component.html",
  styleUrls: ["./zoom-panel.component.css"]
})
export class ZoomPanelComponent implements OnInit {
  constructor(private mapService: MapService) {}

  ngOnInit() {}

  public zoomIn = () => {
    const view = this.mapService.getMap().getView();
    view.animate({
      zoom: view.getZoom() + 1,
      duration: 200
    });
  };

  public zoomOut = () => {
    const view = this.mapService.getMap().getView();
    view.animate({
      zoom: view.getZoom() - 1,
      duration: 200
    });
  };
}
