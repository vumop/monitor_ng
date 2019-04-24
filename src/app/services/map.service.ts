import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "../../environments/environment";

import { MapModel } from "../models/map.model";

import TileWMS from "ol/source/TileWMS";
import TileLayer from "ol/layer/Tile";
import OlFormatWKT from "ol/format/WKT";

@Injectable({
  providedIn: "root"
})
export class MapService {
  private mapModel: MapModel;

  constructor(private http: HttpClient) {
    this.mapModel = new MapModel();
  }

  public getMap = () => this.mapModel.getMap();

  public getMapModel = () => this.mapModel;

  public zoomTo = wkt => {
    this.getMap()
      .getView()
      .fit(
        new OlFormatWKT()
          .readFeature(wkt)
          .getGeometry()
          .getExtent(),
        { duration: 1000 }
      );
  };

  public zoomToFeature = feat => {
    if (feat) {
      this.getMap()
        .getView()
        .fit(feat.getGeometry().getExtent(), { duration: 1000 });
    }
  };

  public searchDistrict = (str: string) =>
    this.http.get(`${environment.apiUrl}/searching/?charset=${str}`);

  public searchDpb = (ctv: string, zkod: string) =>
    this.http.get(
      `${environment.apiUrl}/searchingDPB/?ctverec=${ctv}&zkod=${zkod}`
    );
}
