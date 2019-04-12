import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { environment } from "../environments/environment";

import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedMaterialModule } from "./shared/material/shared-material.module";
import { IncidentModule } from "./core/incident/incident.module";

import { AppComponent } from "./app.component";
import { MapComponent } from "./core/map/map.component";
import { PageNotFoundComponent } from "./shared/page/page-not-found/page-not-found.component";
import { PageErrorComponent } from "./shared/page/page-error/page-error.component";
import { ErrorInterceptor } from "./shared/helpers/error.interceptor";

import { NgxsModule } from "@ngxs/store";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { NgxsStoragePluginModule } from "@ngxs/storage-plugin";
import { IncidentState } from "./state/incident.state";
import { DetailState } from "./state/detail.state";
import { UserState } from "./state/user.state";

import { MapService } from "./services/map.service";
import { LayersService } from "./services/layers.service";
import { IncidentService } from "./services/incident.service";
import { UserService } from "./services/user.service";

import { InfoComponent } from "./core/info/info.component";
import { LoginComponent } from "./core/account/login/login.component";
import { LostPassComponent } from "./core/account/lost-pass/lost-pass.component";

import { FakeBackendProvider } from "./shared/helpers/fake-backend.service";
import { LayersTreeComponent } from './core/map/layers-tree/layers-tree.component';
import { ZoomPanelComponent } from './core/map/zoom-panel/zoom-panel.component';
import { ToolPanelComponent } from './core/map/tool-panel/tool-panel.component';
import { SearchPanelComponent } from './core/map/search-panel/search-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PageNotFoundComponent,
    PageErrorComponent,
    InfoComponent,
    LoginComponent,
    LostPassComponent,
    LayersTreeComponent,
    ZoomPanelComponent,
    ToolPanelComponent,
    SearchPanelComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule,
    SharedMaterialModule,
    AppRoutingModule,
    IncidentModule,
    NgxsModule.forRoot([IncidentState, DetailState, UserState], {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    MapService,
    LayersService,
    IncidentService,
    UserService,
    FakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
