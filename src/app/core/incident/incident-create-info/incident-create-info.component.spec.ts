import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentCreateInfoComponent } from './incident-create-info.component';

describe('IncidentCreateInfoComponent', () => {
  let component: IncidentCreateInfoComponent;
  let fixture: ComponentFixture<IncidentCreateInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentCreateInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentCreateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
