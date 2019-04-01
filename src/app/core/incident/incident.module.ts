import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { IncidentTableComponent } from "./incident-table/incident-table.component";
import { MenuComponent } from "./../menu/menu.component";
import { IncidentComponent } from "./incident.component";

import { SharedMaterialModule } from "./../../shared/material/shared-material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppRoutingModule } from "./../../app-routing.module";

import { RepeatedIncidentPipe } from "./../../shared/helpers/pipes";
import { IncidentDetailComponent } from "./incident-detail/incident-detail.component";

@NgModule({
  declarations: [
    IncidentComponent,
    IncidentTableComponent,
    RepeatedIncidentPipe,
    MenuComponent,
    IncidentDetailComponent
  ],
  entryComponents: [IncidentDetailComponent],
  imports: [
    SharedMaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [MenuComponent]
})
export class IncidentModule {}
