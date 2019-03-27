import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Incident } from "../models/incident.model";

import { default as ApiConfig } from "../config/api"; //import  ApiConfig from "../config/api";

@Injectable({
  providedIn: "root"
})
export class IncidentService {
  constructor(private http: HttpClient) {}

  fetchIncidents() {
    return this.http.get<Incident[]>(`${ApiConfig.apiUrl}/incident/list/`);
  }

  deleteIncident(id: number) {
    return this.http.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  }

  addIncident(payload: Incident) {
    return this.http.post<Incident>(
      "https://jsonplaceholder.typicode.com/todos",
      payload
    );
  }

  updateIncident(payload: Incident, id: number) {
    return this.http.put<Incident>(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      payload
    );
  }
}
