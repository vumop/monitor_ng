export interface Incident {
  datum_hlaseni: string;
  datum_vzniku_do: string;
  datum_vzniku_od: string;
  geometry: string;
  id: number;
  id_uzivatel: number;
  ku: string;
  misto_nazev: string;
  okres: string;
  opakovana: number;
  opakovana_osev: boolean;
  rok: number;
  typ_eroze: string;
}
