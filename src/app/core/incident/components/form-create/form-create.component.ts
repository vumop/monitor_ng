import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl
} from "@angular/forms";

@Component({
  selector: "app-incident-form-create",
  templateUrl: "./form-create.component.html",
  styleUrls: ["./form-create.component.css"]
})
export class FormCreateComponent implements OnInit {
  @Input() feature: string;

  @Output() setLoading = new EventEmitter<boolean>();

  @Output() setIdIncident = new EventEmitter<number>();

  @Output() nextStep = new EventEmitter();

  public form: FormGroup;

  get formControls(): {
    [key: string]: AbstractControl;
  } {
    return this.form.controls;
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: new FormControl(
        { value: "test@mail.cz", disabled: false },
        Validators.compose([Validators.required, Validators.email])
      ),
      datum_vzniku_od: [new Date(), Validators.compose([Validators.required])],
      cas_vzniku_od: ["23:00", Validators.compose([Validators.required])],
      popis: ["description"],
      geom: [this.feature, Validators.compose([Validators.required])],
      valid: [false, Validators.compose([Validators.required])]
    });
  }

  onSubmit(value: any): void {
    /**
     * workflow
     * 1. have to be a valid form
     * 2. the user selects required foto
     * 3. next foto or finish editing (cancel button change to finish button)
     */
    if (!this.form.invalid) {
      console.log(value);

      this.setLoading.emit(true);
      setTimeout(() => {
        // submit form, as result get id incident
        this.setLoading.emit(false);
        this.setIdIncident.emit(69);
        this.nextStep.emit();
        // disable all inputs
        Object.keys(this.form.controls).forEach(key => {
          this.form.controls[key].disable();
        });
        // active file input
      }, 1200);
    }
  }
}
