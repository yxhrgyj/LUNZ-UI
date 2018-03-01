import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleSelectionDemoComponent } from './vehicle-selection-demo.component';

describe('VehicleSelectionDemoComponent', () => {
  let component: VehicleSelectionDemoComponent;
  let fixture: ComponentFixture<VehicleSelectionDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleSelectionDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleSelectionDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
