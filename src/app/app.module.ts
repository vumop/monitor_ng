import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import {environment} from '../environments/environment';

import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from '@angular/common/http'; 
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedMaterialModule } from "./shared/material/shared-material.module";
import { IncidentModule } from "./core/incident/incident.module";

import { AppComponent } from "./app.component";
import { MenuComponent } from "./core/menu/menu.component";
import { MapComponent } from "./core/map/map.component";
import { PageNotFoundComponent } from "./shared/page/page-not-found/page-not-found.component";
import { PageErrorComponent } from "./shared/page/page-error/page-error.component";

import { NgxsModule } from "@ngxs/store";
import { IncidentState } from "./state/incident.state";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";

import { MapService } from "./services/map.service";
import { IncidentService } from "./services/incident.service";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MapComponent,
    PageNotFoundComponent,
    PageErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    SharedMaterialModule,
    IncidentModule,
    NgxsModule.forRoot([IncidentState], { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [MapService, IncidentService],
  bootstrap: [AppComponent]
})
export class AppModule {}
