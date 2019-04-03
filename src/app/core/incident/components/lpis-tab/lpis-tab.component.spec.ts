import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LpisTabComponent } from './lpis-tab.component';

describe('LpisTabComponent', () => {
  let component: LpisTabComponent;
  let fixture: ComponentFixture<LpisTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LpisTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LpisTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
