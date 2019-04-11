import { Component, OnInit } from "@angular/core";

import { Store, Select } from "@ngxs/store";
import { LostPass } from "./../../../actions/user.actions";

import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl
} from "@angular/forms";

@Component({
  selector: "app-lost-pass",
  templateUrl: "./lost-pass.component.html",
  styleUrls: ["./lost-pass.component.css"]
})
export class LostPassComponent implements OnInit {
  public form: FormGroup;

  get formControls(): {
    [key: string]: AbstractControl;
  } {
    return this.form.controls;
  }

  constructor(private store: Store, private formBuilder: FormBuilder) {
    this.form = formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])]
    });
  }

  ngOnInit() {}

  onSubmit(value: any): void {
    if (!this.form.invalid) {
      this.store.dispatch(new LostPass(value.email));
    }
  }
}
