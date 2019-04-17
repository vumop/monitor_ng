import {
  Circle as OlCircle,
  Fill as OlFill,
  Stroke as OlStroke,
  Style as OlStyle,
  Text as OlText,
  RegularShape
} from "ol/style.js";

export default {
  incident_vector: (feature, resolution) => {
    const stroke = "rgba(0,0,0, 0.6)";
    const strokeWidth = 1;
    const fillColor = "rgba(194,115,50, 0.8)";
    if (resolution > 50) {
      //
      return new OlStyle({
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
      return new OlStyle({
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
  }
};
