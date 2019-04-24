import { Component, OnInit, Inject } from "@angular/core";

import {
  MAT_DIALOG_DATA,
  MatTabChangeEvent,
  MatDialogRef
} from "@angular/material";

import { Router } from "@angular/router";

import Feature from "ol/Feature";
import OlFormatWKT from "ol/format/WKT";

export interface DataModel {
  feature: Feature;
  navigateTo: string;
}

@Component({
  selector: "app-incident-create",
  templateUrl: "./incident-create.component.html",
  styleUrls: ["./incident-create.component.css"]
})
export class IncidentCreateComponent implements OnInit {
  public loading: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataModel,
    public dialogRef: MatDialogRef<IncidentCreateComponent>,
    private router: Router
  ) {}

  ngOnInit() {
    /**
     * after close dialog navigate to the route parametr
     */
    this.dialogRef.afterClosed().subscribe(() => {
      this.router.navigate([this.data.navigateTo]);
    });

    console.log(new OlFormatWKT().writeFeature(this.data.feature));
  }
}
