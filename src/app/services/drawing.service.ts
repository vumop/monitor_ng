import { Injectable } from "@angular/core";

import { Drawing } from "../models/drawing.model";

import { LayersService } from "./layers.service";
import { MapService } from "./map.service";

@Injectable({
  providedIn: "root"
})
export class DrawingService {
  private drawModel: Drawing;

  constructor(
    private layersService: LayersService,
    private mapService: MapService
  ) {
    this.drawModel = new Drawing(
      layersService.getFeatureOverlay(),
      mapService.getMap()
    );
  }

  public getDraw = () => this.drawModel;

  public startDraw = type => this.drawModel.active(type);

  public endDraw = () => this.drawModel.deactive();
}
