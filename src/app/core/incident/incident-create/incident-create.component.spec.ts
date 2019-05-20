import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { IncidentCreateComponent } from "./incident-create.component";

import { FormCreateComponent } from "./../components/form-create/form-create.component";
import { FormImageComponent } from "./../components/form-image/form-image.component";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SharedMaterialModule } from "./../../../shared/material/shared-material.module";
import { RouterTestingModule } from "@angular/router/testing";
import Feature from "ol/Feature";
import OlFormatWKT from "ol/format/WKT";
import { Subject } from "rxjs/Subject";

import {
  MAT_DIALOG_DATA,
  MatTabChangeEvent,
  MatDialogRef
} from "@angular/material";

describe("IncidentCreateComponent", () => {
  let component: IncidentCreateComponent;
  let fixture: ComponentFixture<IncidentCreateComponent>;

  const data = {
    feature: new OlFormatWKT().readFeature(
      "POLYGON((-561116.319238772 -1193597.78751057,-561045.763721317 -1194320.98156449,-560788.236082604 -1194275.12047814,-560834.09716895 -1194003.48173594,-560615.375064838 -1193985.84285658,-560618.902840711 -1193731.84299374,-560400.180736598 -1193689.50968326,-560357.847426125 -1193467.25980328,-560513.069564527 -1193491.95423439,-561116.319238772 -1193597.78751057))"
    ),
    navigateTo: "map"
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IncidentCreateComponent,
        FormCreateComponent,
        FormImageComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        SharedMaterialModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: { data, afterClosed: () => new Subject() }
        },
        { provide: MAT_DIALOG_DATA, useValue: data }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should loading", () => {

    const compiled = fixture.debugElement.nativeElement;
    component.setLoading(true);
    expect(compiled.querySelector("mat-progress-bar")).toBe(null);
    expect(component.loading).toBeTruthy();
    fixture.detectChanges();
    expect(compiled.querySelector("mat-progress-bar")).not.toBe(null);
  });

  it("should declare of the ID incident", () => {
    const id = 123;
    component.setIdIncident(id);
    expect(component.idIncident === id).toBeTruthy();
  });
});
