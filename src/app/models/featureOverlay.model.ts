import { Vector as VectorLayer } from "ol/layer.js";
import { Vector as VectorSource } from "ol/source.js";

export class FeatureOverlay {
  private layer: VectorLayer;

  constructor() {
    this.layer = new VectorLayer({
      source: new VectorSource(),
      visible: true
    });
  }

  public getLayer(): VectorLayer {
    return this.layer;
  }
}
