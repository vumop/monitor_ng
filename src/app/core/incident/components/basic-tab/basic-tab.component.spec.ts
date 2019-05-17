import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicTabComponent } from './basic-tab.component';

describe('BasicTabComponent', () => {
  let component: BasicTabComponent;
  let fixture: ComponentFixture<BasicTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
