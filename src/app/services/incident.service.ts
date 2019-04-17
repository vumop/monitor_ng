import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Incident } from "../models/incident.model";

import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class IncidentService {
  constructor(private http: HttpClient) {}

  fetchIncidents() {
    return this.http.get<Incident[]>(`${environment.apiUrl}/incident/list/`);
  }

  getIncident(id: number) {
    return this.http.get<Incident[]>(
      `${environment.apiUrl}/incident/detail/${id}/`
    );
  }

  getFotos(id: number) {
    return this.http.get<Incident[]>(
      `${environment.apiUrl}/incident/foto/${id}/`
    );
  }

  getLpis(id: number) {
    return this.http.get<Incident[]>(
      `${environment.apiUrl}/incident/lpis/${id}/`
    );
  }
}
