import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MapComponent } from "./core/map/map.component";
import { IncidentComponent } from "./core/incident/incident.component";
import { PageNotFoundComponent } from './shared/page/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: "map", component: MapComponent },
  { path: "incident", component: IncidentComponent },
  { path: "", redirectTo: "/map", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
     // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
