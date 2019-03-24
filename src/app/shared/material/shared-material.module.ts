import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  imports: [CommonModule, BrowserAnimationsModule, MatButtonModule],
  exports: [BrowserAnimationsModule, MatButtonModule]
})
export class SharedMaterialModule {}
