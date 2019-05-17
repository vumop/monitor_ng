import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { LayersService } from "./layers.service";

describe("LayersService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] })
  );

  it("should be created", () => {
    const service: LayersService = TestBed.get(LayersService);
    expect(service).toBeTruthy();
  });
});
