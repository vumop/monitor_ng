// Section 1
import { State, Action, StateContext, Selector } from "@ngxs/store";

import {
  GetDetail,
  ResetDetail,
  GetFotos,
  GetLpis
} from "./../actions/detail.actions";

import { IncidentService } from "../services/incident.service";


export class DetailStateModel {
  basic: object;
  fotos: Array<object>;
  lpis: Array<object>;
}

@State<DetailStateModel>({
  name: "Detail",
  defaults: {
    basic: {},
    fotos: [],
    lpis: []
  }
})
export class DetailState {
  constructor(private incidentService: IncidentService) {}

  @Action(GetDetail)
  getDetail(
    { getState, setState }: StateContext<DetailStateModel>,
    { id }: GetDetail
  ) {
    return this.incidentService
      .getIncident(id)
      .toPromise()
      .then(result => {
        const state = getState();
        setState({
          ...state,
          basic: result
        });
      });
  }

  @Action(ResetDetail)
  resetDetail({ getState, setState }: StateContext<DetailStateModel>) {
    const state = getState();
    setState({
      ...state,
      basic: {},
      fotos: [],
      lpis: []
    });
  }

  @Action(GetFotos)
  getFotos(
    { getState, setState }: StateContext<DetailStateModel>,
    { id }: GetFotos
  ) {
    return this.incidentService
      .getFotos(id)
      .toPromise()
      .then(result => {
        const state = getState();
        setState({
          ...state,
          fotos: result
        });
      });
  }

  @Action(GetLpis)
  getLpis(
    { getState, setState }: StateContext<DetailStateModel>,
    { id }: GetLpis
  ) {
    return this.incidentService
      .getLpis(id)
      .toPromise()
      .then(result => {
        const state = getState();
        setState({
          ...state,
          lpis: result
        });
      });
  }
}
