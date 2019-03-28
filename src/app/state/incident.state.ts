// Section 1
import { State, Action, StateContext, Selector } from "@ngxs/store";

import { Incident } from "./../models/incident.model";
import {
  AddIncident,
  RemoveIncident,
  GetIncident,
  PageIncident,
  SortIncident
} from "./../actions/incident.actions";

import { IncidentService } from "../services/incident.service";
import { tap } from "rxjs/operators";

// Section 2
export class IncidentStateModel {
  incidents: Incident[];
  loading: boolean;
  sort: object;
  page: object;
}

// Section 3
@State<IncidentStateModel>({
  name: "Incidents",
  defaults: {
    incidents: [],
    loading: true,
    sort: {},
    page: {}
  }
})
export class IncidentState {
  constructor(private incidentService: IncidentService) {}

  @Selector()
  static getIncidents(state: IncidentStateModel) {
    return state.incidents;
  }

  @Action(GetIncident)
  getIncidents({ getState, setState }: StateContext<IncidentStateModel>) {
    return this.incidentService.fetchIncidents().pipe(
      tap(result => {
        const state = getState();
        setState({
          ...state,
          incidents: result,
          loading: false
        });
      })
    );
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
  /***
   *
   *
   *
   *
   *
   */

  @Action(AddIncident)
  add(
    {
      dispatch,
      getState,
      patchState,
      setState
    }: StateContext<IncidentStateModel>,
    { payload }: AddIncident
  ) {
    const state = getState();
    patchState({
      incidents: [...state.incidents, payload]
    });
    dispatch(new GetIncident());
  }

  @Action(RemoveIncident)
  remove(
    { getState, patchState }: StateContext<IncidentStateModel>,
    { payload }: RemoveIncident
  ) {
    patchState({
      incidents: getState().incidents.filter(a => a.id != payload)
    });
  }
}
