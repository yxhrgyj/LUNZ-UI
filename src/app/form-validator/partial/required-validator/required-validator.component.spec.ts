import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredValidatorComponent } from './required-validator.component';

describe('RequiredValidatorComponent', () => {
  let component: RequiredValidatorComponent;
  let fixture: ComponentFixture<RequiredValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequiredValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
