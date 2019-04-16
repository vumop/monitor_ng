import { Injectable } from "@angular/core";

import Draw from "ol/interaction/Draw";
import { Map } from "ol";
import { Vector as OlVectorSource } from "ol/source.js";
import GeometryType from "ol/geom/GeometryType";
import {
  Circle as OlCircle,
  Fill as OlFill,
  Stroke as OlStroke,
  Style as OlStyle
} from "ol/style.js";

@Injectable({
  providedIn: "root"
})
export class Drawing {
  /**
   * Ol draw interation
   */
  draw: Draw;
  /**
   * vector Ol source
   */
  source: OlVectorSource;
  /**
   * vector cleaning on end of drawing
   */
  vectorClear: boolean;
  /**
   * the delay time in milliseconds
   */
  delayClear: number;
  /**
   * deactivation of the tool on drawend event
   */
  autoDeative: boolean;
  /**
   * OL style of drawing
   */
  style: OlStyle;
  //
  map: Map;

  constructor(layer, map) {
    this.vectorClear = false;
    this.delayClear = 2500;
    this.autoDeative = true;

    this.source = layer.getSource();
    this.map = map;

    this.style = new OlStyle({
      fill: new OlFill({
        color: "rgba(255, 255, 255, 0.2)"
      }),
      stroke: new OlStroke({
        color: "rgba(0, 0, 0, 0.7)",
        lineDash: [10, 10],
        width: 2
      }),
      image: new OlCircle({
        radius: 4,
        stroke: new OlStroke({
          color: "rgba(0, 0, 0, 0.7)"
        }),
        fill: new OlFill({
          color: "rgba(255, 255, 255, 0.2)"
        })
      })
    });
  }

  /**
   * activate draw interaction
   */
  public active(type: string = "Polygon") {
    if (this.draw) {
      this.deactive();
    }
    this.draw = new Draw({
      source: this.source,
      type,
      style: this.style
    });
    this.draw.on("drawend", this.drawEnd);
    //
    this.map.addInteraction(this.draw);
    this.draw.setActive(true);
  }
  /**
   * deactivate draw interaction
   */
  public deactive() {
    this.draw.setActive(false);
    this.map.removeInteraction(this.draw);
    delete this.draw;
  }

  private drawEnd = e => {
    if (this.autoDeative) {
      this.deactive();
    }
    if (this.vectorClear) {
      setTimeout(() => {
        this.source.clear();
      }, this.delayClear);
    }
  };
}
