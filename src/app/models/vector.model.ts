import { Vector as VectorLayer } from "ol/layer.js";
import { Vector as VectorSource } from "ol/source.js";

import { default as Styles } from "./../config/vectorStyle";

export class Vector {
  public layer: VectorLayer;

  constructor(name, idLayer) {
    this.layer = new VectorLayer({
      name,
      idLayer,
      source: new VectorSource(),
      visible: true,
      style: Styles[idLayer]
    });
  }
}
