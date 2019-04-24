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
import { IncidentCreateComponent, IncidentCreateInfo } from "./incident-create/incident-create.component";
import { DateFilterComponent } from "./components/date-filter/date-filter.component";
import { SearchFilterComponent } from "./components/search-filter/search-filter.component";
import { LpisTabComponent } from "./components/lpis-tab/lpis-tab.component";
import { FotosTabComponent } from "./components/fotos-tab/fotos-tab.component";
import { BasicTabComponent } from "./components/basic-tab/basic-tab.component";

import { IncidentLayer } from "./incident-layer/incident.layer";
import { IncidentCreateInfoComponent } from './incident-create-info/incident-create-info.component';

@NgModule({
  declarations: [
    IncidentComponent,
    IncidentTableComponent,
    RepeatedIncidentPipe,
    MenuComponent,
    IncidentDetailComponent,
    DateFilterComponent,
    SearchFilterComponent,
    LpisTabComponent,
    FotosTabComponent,
    BasicTabComponent,
    IncidentCreateComponent,
    IncidentCreateInfoComponent
  ],
  entryComponents: [IncidentDetailComponent, IncidentCreateComponent, IncidentCreateInfoComponent],
  imports: [
    SharedMaterialModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [MenuComponent],
  providers: [IncidentLayer]
})
export class IncidentModule {}
