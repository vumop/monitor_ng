import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedMaterialModule } from "./shared/material/shared-material.module";

import { AppComponent } from "./app.component";
import { MenuComponent } from "./core/menu/menu.component";
import { MapComponent } from "./core/map/map.component";
import { IncidentComponent } from "./core/incident/incident.component";
import { PageNotFoundComponent } from "./shared/page/page-not-found/page-not-found.component";
import { PageErrorComponent } from "./shared/page/page-error/page-error.component";

import { NgxsModule } from "@ngxs/store";
import { TutorialState } from "./state/tutorial.state";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { CreateComponent } from "./create/create.component";
import { ReadComponent } from "./read/read.component";

import { MapService } from "./services/map.service";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MapComponent,
    IncidentComponent,
    PageNotFoundComponent,
    PageErrorComponent,
    CreateComponent,
    ReadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    SharedMaterialModule,
    NgxsModule.forRoot([TutorialState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule {}
