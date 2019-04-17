import { Injectable } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { Observable } from "rxjs";

import { MapState } from "./../../../state/map.state";
import { LayersService } from "./../../../services/layers.service";

@Injectable({
  providedIn: "root"
})
export class Layers {
  @Select(MapState.getLayers) selectedLayers: Observable<any>;

  constructor(private layersService: LayersService) {
    this.selectedLayers.subscribe(val => {
      val.groups.forEach(group => {
        group.layers.forEach(layer => {
          this.layersService.addLayer(layer);
        });
      });
    });
  }
}
