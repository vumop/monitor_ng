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
  MatPaginatorModule,
  MatNativeDateModule
} from "@angular/material";
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import { MatInputModule } from "@angular/material/input";
import {MatDatepickerModule} from '@angular/material/datepicker'; 

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
    MatPaginatorModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule
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
    MatPaginatorModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressBarModule
  ]
})
export class SharedMaterialModule {}
