import { Injectable } from "@angular/core";

import { default as configLayers } from "../config/layers";
import { MapService } from "./map.service";
import { LayerModel } from "../models/layer.model";
import { FeatureOverlay } from "../models/featureOverlay.model";

import TileWMS from "ol/source/TileWMS";
import TileLayer from "ol/layer/Tile";

@Injectable({
  providedIn: "root"
})
export class LayersService {
  private layers: Array<LayerModel>;

  private featureOverlay: FeatureOverlay;

  constructor(private mapService: MapService) {
    this.layers = [];

    this.featureOverlay = new FeatureOverlay();

    this.fetchLayers().groups.forEach(group => {
      group.layers.forEach(layer => {
        this.layers.push(
          new LayerModel(this.createLayer(layer), this.mapService.getMap())
        );
      });
    });

    this.getLayers().forEach(layer => {
      this.mapService.getMapModel().addLayer(layer);
    });

    this.mapService
      .getMapModel()
      .addLayer(
        new LayerModel(this.featureOverlay.getLayer(), this.mapService.getMap())
      );
  }

  public getLayers = () => this.layers;

  public getFeatureOverlay = () => this.featureOverlay.getLayer();

  public fetchLayers(): any {
    return configLayers;
  }

  private createLayer(layer): TileLayer {
    const olLayer = new TileLayer({
      minResolution: this.mapService
        .getMapModel()
        .getResolutionFromScale(layer.min_resolution),
      maxResolution: this.mapService
        .getMapModel()
        .getResolutionFromScale(layer.max_resolution),
      opacity: layer.opacity,
      visible: layer.visible,
      source: new TileWMS({
        url: layer.source.url,
        params: layer.source.params,
        attributions: layer.source.attributions
      })
    });

    olLayer.setProperties({
      id: layer.id,
      name: layer.name,
      metadata: layer.metadata,
      description: layer.description,
      legendUrl: layer.legend_url
    });

    return olLayer;
  }
}
