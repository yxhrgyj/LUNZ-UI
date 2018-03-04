import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqualToValidatorComponent } from './equal-to-validator.component';

describe('EqualToValidatorComponent', () => {
  let component: EqualToValidatorComponent;
  let fixture: ComponentFixture<EqualToValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqualToValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqualToValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
