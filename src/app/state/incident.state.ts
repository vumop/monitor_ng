// Section 1
import { State, Action, StateContext, Selector } from "@ngxs/store";

import { Incident } from "./../models/incident.model";
import {
  AddIncident,
  RemoveIncident,
  GetIncident
} from "./../actions/incident.actions";

import { IncidentService } from "../services/incident.service";
import { tap } from "rxjs/operators";

// Section 2
export class IncidentStateModel {
  Incidents: Incident[];
}

// Section 3
@State<IncidentStateModel>({
  name: "Incidents",
  defaults: {
    Incidents: []
  }
})
export class IncidentState {
  constructor(private IncidentService: IncidentService) {}

  @Selector()
  static getIncidents(state: IncidentStateModel) {
    return state.Incidents;
  }

  @Action(GetIncident)
  getIncidents({ getState, setState }: StateContext<IncidentStateModel>) {
    return this.IncidentService.fetchIncidents().pipe(
      tap(result => {
        const state = getState();

        console.log(result);

        setState({
          ...state,
          Incidents: result
        });
      })
    );
  }

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
      Incidents: [...state.Incidents, payload]
    });
    dispatch(new GetIncident());
  }

  @Action(RemoveIncident)
  remove(
    { getState, patchState }: StateContext<IncidentStateModel>,
    { payload }: RemoveIncident
  ) {
    patchState({
      Incidents: getState().Incidents.filter(a => a.id != payload)
    });
  }
}
