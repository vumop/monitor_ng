import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotosTabComponent } from './fotos-tab.component';

describe('FotosTabComponent', () => {
  let component: FotosTabComponent;
  let fixture: ComponentFixture<FotosTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotosTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotosTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
