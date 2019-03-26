import { NgModule } from "@angular/core";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatTableModule,
  MatCardModule
} from "@angular/material";


@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatCardModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatCardModule
  ]
})
export class SharedMaterialModule {}
