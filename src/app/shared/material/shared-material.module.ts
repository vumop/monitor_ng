import { NgModule } from "@angular/core";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import {
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatTableModule,
  MatCardModule,
  MatSortModule,
  MatPaginatorModule
} from "@angular/material";


@NgModule({
  imports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatCardModule,
    MatSortModule,
    MatPaginatorModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatCardModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class SharedMaterialModule {}
