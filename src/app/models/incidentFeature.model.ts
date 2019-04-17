import OlFormatWKT from "ol/format/WKT";

export class IncidentFeature {

  public id: number;

  public geometry: string;

  constructor(id, geometry) {
    this.id = id;
    this.geometry = geometry;
  }

  public createFeature() {
    const feature = new OlFormatWKT().readFeature(this.geometry);
    feature.setId(this.id);
    return feature;
  }
}
