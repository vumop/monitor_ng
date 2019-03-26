import { NgModule } from "@angular/core";

import { IncidentTableComponent } from "./incident-table/incident-table.component";
import { IncidentComponent } from "./incident.component";

import { SharedMaterialModule } from "./../../shared/material/shared-material.module";

@NgModule({
  declarations: [IncidentComponent, IncidentTableComponent],
  imports: [SharedMaterialModule]
})
export class IncidentModule {}
