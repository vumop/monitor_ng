import { Injectable } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { Observable } from "rxjs";

import {
  IncidentState,
  IncidentStateModel
} from "./../../../state/incident.state";

import { LayersService } from "./../../../services/layers.service";
import { Vector as VectorModel } from "./../../../models/vector.model";
import { Incident } from "./../../../models/incident.model";

@Injectable({
  providedIn: "root"
})
export class IncidentLayer {
  public incidentLayer: VectorModel;

  @Select(IncidentState.getIncidents) selectedIncidents: Observable<
    IncidentStateModel
  >;

  constructor(private layersService: LayersService) {

    this.incidentLayer = new VectorModel("Erozní události", "incident_vector");
    this.incidentLayer.layer.setZIndex(999);
    this.layersService.addVectorLayer(this.incidentLayer.layer);

    this.selectedIncidents.subscribe(data => {
      this.incidentLayer.layer.getSource().clear();
      data.incidents.forEach(res =>
        this.incidentLayer.layer
          .getSource()
          .addFeature(new Incident(res).createFeature())
      );
    });
  }
}
