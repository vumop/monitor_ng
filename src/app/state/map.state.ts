import { State, Action, StateContext, Selector } from "@ngxs/store";

import { GetLayers } from "./../actions/map.actions";
import { LayersService } from "../services/layers.service";
import { tap, first, catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

interface LayersModel {
  layers: { [groups: string]: Array<object> };
}

@State<LayersModel>({
  name: "Map",
  defaults: {
    layers: {}
  }
})
export class MapState {
  @Selector()
  static getLayers(state: LayersModel) {
    return state.layers;
  }

  constructor(private layersService: LayersService) {}

  @Action(GetLayers)
  getLayers({ patchState }: StateContext<LayersModel>) {
    const layers = this.layersService.fetchLayers();
    patchState({
      layers
    });
  }
}
