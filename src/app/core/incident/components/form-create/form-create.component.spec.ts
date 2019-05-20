import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { FormCreateComponent } from "./form-create.component";

import { SharedMaterialModule } from "./../../../../shared/material/shared-material.module";

describe("FormCreateComponent", () => {
  let component: FormCreateComponent;
  let fixture: ComponentFixture<FormCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormCreateComponent],
      imports: [ReactiveFormsModule, FormsModule, SharedMaterialModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("email field validity", () => {
    const input = component.form.controls["email"];
    input.setValue("");
    expect(input.valid).toBeFalsy();

    input.setValue("test@test.com");
    expect(input.valid).toBeTruthy();
  });

  it("date field validity", () => {
    const input = component.form.controls["datum_vzniku_od"];
    input.setValue("");
    expect(input.valid).toBeFalsy();
  });

  it("time field validity", () => {
    const input = component.form.controls["cas_vzniku_od"];
    input.setValue("");
    expect(input.valid).toBeFalsy();
  });

  it("should submit or prevent of submitting form", () => {

    component.form.controls["email"].setValue("test@test.com");
    component.form.controls["datum_vzniku_od"].setValue(new Date());
    component.form.controls["cas_vzniku_od"].setValue("23:00");
    component.form.controls["geom"].setValue("test geom");
    expect(component.form.valid).toBeTruthy();

    component.form.controls["email"].reset();
    expect(component.form.valid).toBeFalsy();

    component.form.controls["datum_vzniku_od"].reset();
    expect(component.form.valid).toBeFalsy();

    component.form.controls["cas_vzniku_od"].reset();
    expect(component.form.valid).toBeFalsy();

    component.form.controls["geom"].reset();
    expect(component.form.valid).toBeFalsy();
  });
});
