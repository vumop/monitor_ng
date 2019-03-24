import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { SharedMaterialModule } from "./shared/material/shared-material.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SharedMaterialModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
