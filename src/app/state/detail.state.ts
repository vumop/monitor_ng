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
    { getState, setState, patchState }: StateContext<DetailStateModel>,
    { id }: GetDetail
  ) {
    return this.incidentService
      .getIncident(id)
      .toPromise()
      .then(result => {
        patchState({
          basic: result
        });
      });
  }

  @Action(ResetDetail)
  resetDetail({
    getState,
    setState,
    patchState
  }: StateContext<DetailStateModel>) {
    patchState({
      basic: {},
      fotos: [],
      lpis: []
    });
  }

  @Action(GetFotos)
  getFotos(
    { getState, setState, patchState }: StateContext<DetailStateModel>,
    { id }: GetFotos
  ) {
    return this.incidentService
      .getFotos(id)
      .toPromise()
      .then(result => {
        patchState({
          fotos: result
        });
      });
  }

  @Action(GetLpis)
  getLpis(
    { getState, setState, patchState }: StateContext<DetailStateModel>,
    { id }: GetLpis
  ) {
    return this.incidentService
      .getLpis(id)
      .toPromise()
      .then(result => {
        patchState({
          lpis: result
        });
      });
  }
}
