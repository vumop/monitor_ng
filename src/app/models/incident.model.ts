import { IncidentFeature } from "./incidentFeature.model";

export interface IncidentInput {
  id: number;
  datum_hlaseni: string;
  datum_vzniku_do: string;
  datum_vzniku_od: string;
  geometry: string;
  id_uzivatel: number;
  ku: string;
  misto_nazev: string;
  okres: string;
  opakovana: number;
  opakovana_osev: boolean;
  rok: number;
  typ_eroze: string;
}
export class Incident extends IncidentFeature {
  public id: number;
  public datum_hlaseni: string;
  public datum_vzniku_do: string;
  public datum_vzniku_od: string;
  public geometry: string;
  public id_uzivatel: number;
  public ku: string;
  public misto_nazev: string;
  public okres: string;
  public opakovana: number;
  public opakovana_osev: boolean;
  public rok: number;
  public typ_eroze: string;

  constructor(input: IncidentInput) {
    super(input.id, input.geometry);
    Object.assign(this, input);
  }

  public getId = () => this.id;

  public getDatumVzniku = () => this.datum_vzniku_od;
}
