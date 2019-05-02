import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./core/account/login/login.component";
import { LostPassComponent } from "./core/account/lost-pass/lost-pass.component";
import { MapComponent } from "./core/map/map.component";
import { IncidentComponent } from "./core/incident/incident.component";
import { InfoComponent } from "./core/info/info.component";
import { PageNotFoundComponent } from "./shared/page/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "map", component: MapComponent },
  { path: "map/detail/:id", component: MapComponent },
  { path: "info", component: InfoComponent },
  { path: "", redirectTo: "/map", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes
      //{ enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
