import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangeLengthValidatorComponent } from './range-length-validator.component';

describe('RangeLengthValidatorComponent', () => {
  let component: RangeLengthValidatorComponent;
  let fixture: ComponentFixture<RangeLengthValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangeLengthValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangeLengthValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
