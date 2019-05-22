import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Incident } from "../models/incident.model";

import { environment } from "../../environments/environment";
import { interceptingHandler } from "@angular/common/http/src/module";

interface ApiResponse {
  success: boolean;
  msg: string;
}
interface CreateIncident extends ApiResponse {
  id: number;
}

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
    return this.http.get<Array<{}>>(
      `${environment.apiUrl}/incident/foto/${id}/`
    );
  }

  getLpis(id: number) {
    return this.http.get<Array<{}>>(
      `${environment.apiUrl}/incident/lpis/${id}/`
    );
  }

  createIncident(payload: object) {
    return this.http.post<CreateIncident>(
      `${environment.apiUrl}/incident/new/`,
      payload,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/x-www-form-urlencoded"
        })
      }
    );
  }

  addImage(payload: object) {
    return this.http.post<ApiResponse>(
      `${environment.apiUrl}/incident/foto-save/`,
      payload,
      {
        headers: new HttpHeaders({
          "Content-Type": "application/x-www-form-urlencoded"
        })
      }
    );
  }
}
