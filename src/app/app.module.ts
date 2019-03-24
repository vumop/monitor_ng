import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedMaterialModule } from "./shared/material/shared-material.module";

import { AppComponent } from "./app.component";
import { MenuComponent } from "./core/menu/menu.component";
import { MapComponent } from './core/map/map.component';
import { IncidentComponent } from './core/incident/incident.component';
import { PageNotFoundComponent } from './shared/page/page-not-found/page-not-found.component';
import { PageErrorComponent } from './shared/page/page-error/page-error.component';

@NgModule({
  declarations: [AppComponent, MenuComponent, MapComponent, IncidentComponent, PageNotFoundComponent, PageErrorComponent],
  imports: [BrowserModule, AppRoutingModule, FlexLayoutModule, SharedMaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
