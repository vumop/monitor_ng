import { Component, OnInit, Inject, ViewChild } from "@angular/core";

import { MatStepper } from "@angular/material/stepper";

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
  @ViewChild("stepper") stepper: MatStepper;

  public loading: boolean;
  public idIncident: number;
  public feature: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataModel,
    public dialogRef: MatDialogRef<IncidentCreateComponent>,
    private router: Router
  ) {
    this.idIncident = null;
    this.feature = new OlFormatWKT().writeFeature(this.data.feature);
  }

  ngOnInit() {
    /**
     * after close dialog navigate to the route parametr
     */
    this.dialogRef.afterClosed().subscribe(() => {
      this.router.navigate([this.data.navigateTo]);
    });
  }
  /**
   * the pointer of loading or saving state
   * @param val
   */
  public setLoading(val: boolean) {
    this.loading = val;
  }
  /**
   * set ID of the saved incident
   * @param val
   */
  public setIdIncident(val: number) {
    this.idIncident = val;
  }
  /**
   * to switch the steps programmatically
   */
  public nextStep = (): void => {
    this.stepper.selected.completed = true;
    this.stepper.selected.editable = false;
    this.stepper.next();
  }
}
