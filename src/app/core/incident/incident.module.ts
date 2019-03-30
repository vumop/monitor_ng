import { NgModule } from "@angular/core";

import { IncidentTableComponent } from "./incident-table/incident-table.component";
import { MenuComponent } from "./../menu/menu.component";
import { IncidentComponent } from "./incident.component";

import { SharedMaterialModule } from "./../../shared/material/shared-material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppRoutingModule } from "./../../app-routing.module";

import { RepeatedIncidentPipe } from "./../../shared/helpers/pipes"; // import our pipe here

@NgModule({
  declarations: [
    IncidentComponent,
    IncidentTableComponent,
    RepeatedIncidentPipe,
    MenuComponent
  ],
  imports: [SharedMaterialModule, FlexLayoutModule, AppRoutingModule],
  exports: [MenuComponent]
})
export class IncidentModule {}
