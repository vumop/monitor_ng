/**
 * Init in map.component
 */
import { Select } from "ol/interaction.js";
import { Circle, Fill, Stroke, Style } from "ol/style.js";

import { Vector as VectorLayer } from "ol/layer.js";
import { Map } from "ol";

export class SelectModel {
  public select: Select;

  private layer: VectorLayer;

  public style: Style;

  constructor(layer) {
    this.layer = layer;

    this.style = new Style({
      fill: new Fill({
        color: "rgba(50, 194, 187, 0.5)"
      }),
      stroke: new Stroke({
        color: "rgba(0,0,0, 0.6)",
        width: 2
      }),
      image: new Circle({
        radius: 9,
        fill: new Fill({
          color: "rgba(50, 194, 187, 0.5)"
        })
      })
    });

    this.select = new Select({
      multi: false,
      hitTolerance: 0,
      layers: [this.layer],
      features: this.layer.getSource().getFeatures(),
      filter: (feature, filteredLayer) => {
        /* some logic on a feature and layer to decide if it should be selectable; return true if yes */
        return filteredLayer.get("name") === this.layer.get("name");
      },
      style: this.style
    });
  }

  /**
   * activate interaction
   */
  public activate(map: Map) {
    map.addInteraction(this.select);
    this.select.setActive(true);
  }
  /**
   * deactivate interaction
   */
  public deactivate() {
    this.select.setActive(false);
  }
}
