// Section 1
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { tap } from "rxjs/operators";

import { Incident } from "./../models/incident.model";

import {
  GetIncident,
  PageIncident,
  SortIncident,
  FilterIncident
} from "./../actions/incident.actions";

import { IncidentService } from "../services/incident.service";
import { MapService } from "../services/map.service";

export class IncidentStateModel {
  incidents: Incident[];
  loading: boolean;
  sort: object;
  page: object;
  filter: object;
  detail: object;
}

@State<IncidentStateModel>({
  name: "Incidents",
  defaults: {
    incidents: [],
    loading: true,
    sort: {},
    page: {},
    filter: {
      date: null,
      district: ""
    },
    detail: {}
  }
})
export class IncidentState {
  constructor(
    private incidentService: IncidentService,
    private mapService: MapService
  ) {}

  @Selector()
  static getIncidents(state: IncidentStateModel) {
    return state;
  }

  @Action(GetIncident)
  getIncidents({ getState, setState }: StateContext<IncidentStateModel>) {
    return this.incidentService
      .fetchIncidents()
      .toPromise()
      .then(result => {
        const state = getState();
        const incidentRes = [];
        result.map(res => {
          const incident = new Incident(res);
          this.mapService.featureOverlay
            .getSource()
            .addFeature(incident.createFeature());
          incidentRes.push(incident);
        });
        setState({
          ...state,
          incidents: incidentRes,
          loading: false
        });
      });
  }

  @Action(SortIncident)
  sort(
    { getState, patchState }: StateContext<IncidentStateModel>,
    { payload }: SortIncident
  ) {
    const state = getState();
    patchState({
      sort: payload
    });
  }

  @Action(PageIncident)
  page(
    { getState, patchState }: StateContext<IncidentStateModel>,
    { payload }: PageIncident
  ) {
    patchState({
      page: payload
    });
  }

  @Action(FilterIncident)
  filter(
    { getState, patchState, setState }: StateContext<IncidentStateModel>,
    { payload, type }: FilterIncident
  ) {
    const state = getState();
    switch (type) {
      case "date":
        setState({
          ...state,
          ...{
            filter: {
              date: payload,
              district: ""
            }
          }
        });
        break;
      case "district":
        setState({
          ...state,
          ...{
            filter: {
              date: null,
              district: payload
            }
          }
        });
        break;
    }
  }
}
