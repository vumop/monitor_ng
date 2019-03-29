import { NgModule } from "@angular/core";

import { IncidentTableComponent } from "./incident-table/incident-table.component";
import { IncidentComponent } from "./incident.component";

import { SharedMaterialModule } from "./../../shared/material/shared-material.module";

import { RepeatedIncidentPipe } from "./../../shared/helpers/pipes"; // import our pipe here

@NgModule({
  declarations: [
    IncidentComponent,
    IncidentTableComponent,
    RepeatedIncidentPipe
  ],
  imports: [SharedMaterialModule]
})
export class IncidentModule {}
