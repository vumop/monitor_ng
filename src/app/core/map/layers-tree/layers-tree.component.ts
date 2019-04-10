import { Component, OnInit } from "@angular/core";

import { LayersService } from "./../../../services/layers.service";
import { LayerModel } from "./../../../models/layer.model";

@Component({
  selector: "app-layers-tree",
  templateUrl: "./layers-tree.component.html",
  styleUrls: ["./layers-tree.component.css"]
})
export class LayersTreeComponent implements OnInit {
  public layers: Array<LayerModel>;

  constructor(private layersService: LayersService) {}

  ngOnInit() {
    this.layers = this.layersService.getLayers();
  }
  
  public setVisibility(layer: LayerModel): void {
    if (!layer.disabled) {
      layer.setVisibility(!layer.olLayer.getVisible());
    }
  }

  public getMetadata(layer: LayerModel): void {
    if (layer.olLayer.get("metadata")) {
      window.open(layer.olLayer.get("metadata"), "_blank");
    }
  }
}
