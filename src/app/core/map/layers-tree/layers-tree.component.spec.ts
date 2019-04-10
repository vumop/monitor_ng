import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayersTreeComponent } from './layers-tree.component';

describe('LayersTreeComponent', () => {
  let component: LayersTreeComponent;
  let fixture: ComponentFixture<LayersTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayersTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayersTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
