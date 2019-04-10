import { Component, OnInit } from "@angular/core";

import { Store, Select } from "@ngxs/store";
import { Observable } from "rxjs";

import { LayersService } from "./services/layers.service";
import { GetIncident } from "./actions/incident.actions";
import { Incident } from "./models/incident.model";

import { IncidentState, IncidentStateModel } from "./state/incident.state";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  @Select(IncidentState.getIncidents) selectedIncidents: Observable<
    IncidentStateModel
  >;

  constructor(
    private store: Store,
    private layersService: LayersService
  ) {}

  ngOnInit() {
    this.store.dispatch(new GetIncident());

    this.selectedIncidents.subscribe(data => {
      data.incidents.map(res =>
        this.layersService
          .getFeatureOverlay()
          .getSource()
          .addFeature(new Incident(res).createFeature())
      );
    });
  }
}
