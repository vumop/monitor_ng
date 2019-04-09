// Section 1
import { State, Action, StateContext, Selector } from "@ngxs/store";

import {
  GetIncident,
  PageIncident,
  SortIncident,
  FilterIncident
} from "./../actions/incident.actions";

import { IncidentService } from "../services/incident.service";

export class IncidentStateModel {
  incidents: Array<any>;
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
  constructor(private incidentService: IncidentService) {}

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
        setState({
          ...state,
          incidents: result,
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
