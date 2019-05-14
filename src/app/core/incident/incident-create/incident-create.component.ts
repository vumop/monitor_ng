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
  public idIncident: number;
  public file: any;

  public form: FormGroup;

  get formControls(): {
    [key: string]: AbstractControl;
  } {
    return this.form.controls;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DataModel,
    public dialogRef: MatDialogRef<IncidentCreateComponent>,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      email: new FormControl(
        { value: "test@mail.cz", disabled: false },
        Validators.compose([Validators.required, Validators.email])
      ),
      datum_vzniku_od: [new Date(), Validators.compose([Validators.required])],
      cas_vzniku_od: ["23:00", Validators.compose([Validators.required])],
      popis: ["description"],
      geom: [
        new OlFormatWKT().writeFeature(this.data.feature),
        Validators.compose([Validators.required])
      ]
    });

    this.idIncident = null;
    this.file = null;
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
   * on change input file value
   * @param event
   */
  public onFileChanged = (event): void => {

    console.log(this.file);

    const target = event.target || event.srcElement; //if target isn't there then take srcElement
    this.file = target.files[0];
    // have to be defined, else -> "undefined"
    this.file.popis = "";
    console.log(this.file);
  };

  onSubmit(value: any): void {
    /**
     * workflow
     * 1. have to be a valid form
     * 2. the user selects required foto
     * 3. next foto or finish editing (cancel button change to finish button)
     */
    if (!this.form.invalid) {
      console.log(value);

      this.loading = true;
      setTimeout(() => {
        // submit form, as result get id incident
        this.loading = false;
        this.idIncident = 69;        
        // disable all inputs
        Object.keys(this.form.controls).forEach(key => {
          this.form.controls[key].disable();
        });   
        // active file input
        this.activeFileInput();
      }, 1200);
    }
  }

  private activeFileInput = () => {
    const fileInput: HTMLElement = document.getElementById(
      "fileInput"
    ) as HTMLElement;
    fileInput.click();
  };
}
