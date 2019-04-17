import { Injectable } from "@angular/core";

import { default as configLayers } from "../config/layers";
import { MapService } from "./map.service";
import { LayerModel } from "../models/layer.model";
import { FeatureOverlay } from "../models/featureOverlay.model";

import TileWMS from "ol/source/TileWMS";
import TileLayer from "ol/layer/Tile";
import { Vector as VectorLayer } from "ol/layer.js";

@Injectable({
  providedIn: "root"
})
export class LayersService {
  /**
   * configuration of the tree layer [array]
   */
  private layers: Array<LayerModel>;

  private vectorLayers: Array<LayerModel>;

  private featureOverlay: FeatureOverlay;

  constructor(private mapService: MapService) {
    this.layers = [];
    this.vectorLayers = [];

    this.featureOverlay = new FeatureOverlay();

    this.mapService
      .getMapModel()
      .addLayer(
        new LayerModel(this.featureOverlay.getLayer(), this.mapService.getMap())
      );
  }
  // get array of layers
  public getLayers = () => this.layers;
  // fetch vector layers by idLayer
  public getVectorLayer = idLayer =>
    this.vectorLayers.find(vector => vector.olLayer.get("idLayer") === idLayer);
  // add layer to OL map
  public addLayer = layer => {
    const layerModel = new LayerModel(
      this.createLayer(layer),
      this.mapService.getMap()
    );
    this.layers.push(layerModel);
    this.mapService.getMapModel().addLayer(layerModel);
  };
  // add vector layer to OL map
  public addVectorLayer = layer => {
    const layerModel = new LayerModel(layer, this.mapService.getMap());
    this.vectorLayers.push(layerModel);
    this.mapService.getMapModel().addLayer(layerModel);
  };

  public getFeatureOverlay = () => this.featureOverlay.getLayer();

  public fetchLayers(): any {
    return configLayers;
  }

  private createLayer = (layer): TileLayer => {
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
  };
}
