import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl
} from "@angular/forms";

import { Store, Select } from "@ngxs/store";
import { Observable } from "rxjs";

import { UserState } from "./../../../state/user.state";
import { Login } from "./../../../actions/user.actions";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  @Select(UserState.isLoggend) selectedIsLoggend: Observable<boolean>;
  /**
   *
   */
  public loginForm: FormGroup;

  get formControls(): {
    [key: string]: AbstractControl;
  } {
    return this.loginForm.controls;
  }

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      jmeno_uzivatel: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
          this.specialCharValidator
        ])
      ],
      heslo: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
          this.specialCharValidator
        ])
      ]
    });
  }

  ngOnInit() {
    // redirect to the homePage
    this.selectedIsLoggend.subscribe(val => {
      if (val) {
        this.router.navigate(["/"]);
      }
    });
  }

  onSubmit(value: any): void {
    if (!this.loginForm.invalid) {
      this.store.dispatch(new Login(value.jmeno_uzivatel, value.heslo));
    }
  }

  private specialCharValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value) {
      if (!control.value.match(/['"/><:;|´´;]/)) {
        return null;
      } else {
        return { invalidChar: true };
      }
    }
  }
}
