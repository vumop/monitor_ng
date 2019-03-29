import OlFormatWKT from "ol/format/WKT";

import {
  Circle as OlCircle,
  Fill as OlFill,
  Stroke as OlStroke,
  Style as OlStyle,
  Text as OlText,
  RegularShape
} from "ol/style.js";

export class IncidentFeature {
  private style: OlStyle;

  public id: number;

  public geometry: string;

  constructor(id, geometry) {
    this.id = id;
    this.geometry = geometry;
    /**
     *
     */
    this.style = (feature, resolution) => {
      const stroke = "rgba(0,0,0, 0.6)";
      const strokeWidth = 1;
      const fillColor = "rgba(194,115,50, 0.8)";
      let style;

      if (resolution > 50) {
        //
        style = new OlStyle({
          geometry: feature.getGeometry().getInteriorPoint(),
          fill: new OlFill({
            color: fillColor
          }),
          stroke: new OlStroke({
            color: stroke,
            width: strokeWidth
          }),
          image: new RegularShape({
            fill: new OlFill({ color: fillColor }),
            stroke: new OlStroke({ color: stroke, width: strokeWidth }),
            points: 4,
            radius: 10,
            angle: Math.PI / 4
          })
        });
      } else {
        //
        style = new OlStyle({
          fill: new OlFill({
            color: fillColor
          }),
          stroke: new OlStroke({
            color: stroke,
            width: strokeWidth
          }),
          image: new OlCircle({
            radius: 6,
            fill: new OlFill({
              color: stroke
            })
          }),
          text: new OlText({
            text: String(feature.getId()),
            font: "13px sans-serif",
            fill: new OlFill({
              color: "rgba(0,0,0,0.8)",
              width: 3
            }),
            stroke: new OlStroke({
              color: "rgba(255,255,255,0.8)",
              width: 2
            })
          })
        });
      }
      return style;
    };
  }

  public createFeature() {
    const feature = new OlFormatWKT().readFeature(this.geometry);
    feature.setId(this.id);
    feature.setStyle(this.style);
    return feature;
  }
}
