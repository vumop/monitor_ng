import { Injectable } from "@angular/core";

import { MapModel } from "../models/map.model";

import TileWMS from "ol/source/TileWMS";
import TileLayer from "ol/layer/Tile";

@Injectable({
  providedIn: "root"
})
export class MapService {
  private mapModel: MapModel;

  constructor() {
    this.mapModel = new MapModel();
  }

  public getMap = () => this.mapModel.getMap();

  public getMapModel = () => this.mapModel;
}
