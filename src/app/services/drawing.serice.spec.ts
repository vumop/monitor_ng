import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DrawingService } from './drawing.service';

describe('DrawingService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: DrawingService = TestBed.get(DrawingService);
    expect(service).toBeTruthy();
  });
});
