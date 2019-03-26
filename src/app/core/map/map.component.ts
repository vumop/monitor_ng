import { Component, OnInit } from "@angular/core";

import { MapService } from "../../services/map.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  constructor(private mapService: MapService) {
    console.log("construct");
  }

  ngOnInit() {
    this.mapService.getMap().setTarget(null);
    setTimeout(() => {
      this.mapService.getMap().setTarget("map");
    }, 100);
  }
}
