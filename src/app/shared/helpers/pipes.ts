import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "repeatedIncident" })
export class RepeatedIncidentPipe implements PipeTransform {
  transform(value): string {
    const count = value.opakovana > 1 ? ` (${value.opakovana})` : "";
    const osev = value.opakovana_osev ? " (v osevu)" : "";
    return value.opakovana ? `ANO${count}${osev}` : `NE${osev}`;
  }
}
