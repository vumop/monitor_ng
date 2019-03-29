import { Component, OnInit } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { MapService } from "../../services/map.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  constructor(private mapService: MapService, private store: Store) {}

  ngOnInit() {
    this.mapService.getMap().setTarget(null);
    setTimeout(() => {
      this.mapService.getMap().setTarget("map");
    }, 100);
  }
}
