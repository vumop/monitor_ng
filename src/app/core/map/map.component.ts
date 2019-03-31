import { Component, OnInit } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { MapService } from "../../services/map.service";

import { ActivatedRoute} from "@angular/router";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  constructor(
    private mapService: MapService,
    private store: Store,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.mapService.getMap().setTarget(null);
    setTimeout(() => {
      this.mapService.getMap().setTarget("map");
    }, 100);


    let id = this.route.snapshot.paramMap.get('id');
    console.log('id incident', id);
  }
}
