import { Component, OnInit, Inject } from "@angular/core";

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl
} from "@angular/forms";

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

  public form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataModel,
    public dialogRef: MatDialogRef<IncidentCreateComponent>,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      jmeno_uzivatel: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25)
        ])
      ],
      heslo: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15)
        ])
      ]
    });
  }

  ngOnInit() {
    /**
     * after close dialog navigate to the route parametr
     */
    this.dialogRef.afterClosed().subscribe(() => {
      this.router.navigate([this.data.navigateTo]);
    });

    console.log(new OlFormatWKT().writeFeature(this.data.feature));
  }

  onSubmit(value: any): void {
    if (!this.form.invalid) {
    }
  }
}
