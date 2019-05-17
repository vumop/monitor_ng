import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { MapService } from "./map.service";

describe("MapService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] })
  );

  it("should be created", () => {
    const service: MapService = TestBed.get(MapService);
    expect(service).toBeTruthy();
  });
});
