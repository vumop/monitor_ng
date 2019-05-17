import { TestBed, fakeAsync } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpErrorResponse } from "@angular/common/http";
import { IncidentService } from "./incident.service";

import { of } from "rxjs";
import { Incident } from "../models/incident.model";

describe("IncidentService", () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: IncidentService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"]);
    service = new IncidentService(<any>httpClientSpy);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should return expected data (HttpClient called once)", () => {
    const testData = [
      {
        id: 1,
        datum_hlaseni: "",
        datum_vzniku_do: "",
        datum_vzniku_od: "",
        geometry: "",
        id_uzivatel: 1,
        ku: "",
        misto_nazev: "",
        okres: "",
        opakovana: 1,
        opakovana_osev: false,
        rok: 1,
        typ_eroze: "",
        getId: null,
        getDatumVzniku: null,
        createFeature: null
      }
    ];

    httpClientSpy.get.and.returnValue(of(testData));

    service
      .fetchIncidents()
      .subscribe(data => expect(data).toEqual(testData, "expected data"), fail);
    expect(httpClientSpy.get.calls.count()).toBe(1, "one call");
  });
});
