// Section 1
import { State, Action, StateContext, Selector } from "@ngxs/store";
import { tap } from "rxjs/operators";

import {
  GetIncident,
  PageIncident,
  SortIncident,
  FilterIncident,
  CreateIncident,
  AddImage
} from "./../actions/incident.actions";

import { IncidentService } from "../services/incident.service";

export class IncidentStateModel {
  incidents: Array<any>;
  loading: boolean;
  sort: object;
  page: object;
  filter: object;
  detail: object;
  additionIncident: object | undefined;
  additionImage: object | undefined;
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
    detail: {},
    additionIncident: undefined,
    additionImage: undefined
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

  @Action(CreateIncident)
  create(
    { getState, setState, patchState }: StateContext<IncidentStateModel>,
    { payload }: CreateIncident
  ) {
    return this.incidentService.createIncident(payload).pipe(
      tap(result => {
        const state = getState();
        patchState({
          additionIncident: { payload, id: 69 /*result.id*/ }
        });
      })
    );
  }

  @Action(AddImage)
  addImage(
    { getState, setState, patchState }: StateContext<IncidentStateModel>,
    { payload, idIncident }: AddImage
  ) {
    return this.incidentService.addImage(payload).pipe(
      tap(result => {
        const state = getState();
        patchState({
          additionImage: { payload, idIncident }
        });
      })
    );
  }
}
