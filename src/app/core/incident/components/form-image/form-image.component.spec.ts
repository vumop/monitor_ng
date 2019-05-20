import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { FormImageComponent } from "./form-image.component";

import { SharedMaterialModule } from "./../../../../shared/material/shared-material.module";

describe("FormImageComponent", () => {
  let component: FormImageComponent;
  let fixture: ComponentFixture<FormImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormImageComponent],
      imports: [ReactiveFormsModule, FormsModule, SharedMaterialModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should file variable null", () => {
    expect(component.file === null).toBeTruthy();
  });

});
