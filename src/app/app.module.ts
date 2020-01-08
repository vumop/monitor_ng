import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { environment } from "../environments/environment";

import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedMaterialModule } from "./shared/material/shared-material.module";
import { MatSnackBar } from "@angular/material";
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
import { MapState } from "./state/map.state";

import { MapService } from "./services/map.service";
import { LayersService } from "./services/layers.service";
import { IncidentService } from "./services/incident.service";
import { UserService } from "./services/user.service";
import { DrawingService } from "./services/drawing.service";

import { Layers } from "./core/map/layers/layers";

import { InfoComponent } from "./core/info/info.component";
import { LoginComponent } from "./core/account/login/login.component";
import { LostPassComponent } from "./core/account/lost-pass/lost-pass.component";

import { FakeBackendProvider } from "./shared/helpers/fake-backend.service";
import { LayersTreeComponent } from "./core/map/layers-tree/layers-tree.component";
import { ZoomPanelComponent } from "./core/map/zoom-panel/zoom-panel.component";
import { ToolPanelComponent } from "./core/map/tool-panel/tool-panel.component";
import { SearchPanelComponent } from "./core/map/search-panel/search-panel.component";

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
    NgxsModule.forRoot([IncidentState, DetailState, UserState, MapState], {
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
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'cs' },
    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    MapService,
    LayersService,
    IncidentService,
    UserService,
    DrawingService,
    FakeBackendProvider,
    MatSnackBar,
    Layers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
