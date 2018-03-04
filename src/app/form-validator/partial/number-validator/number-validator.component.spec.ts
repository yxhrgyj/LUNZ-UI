import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberValidatorComponent } from './number-validator.component';

describe('NumberValidatorComponent', () => {
  let component: NumberValidatorComponent;
  let fixture: ComponentFixture<NumberValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
