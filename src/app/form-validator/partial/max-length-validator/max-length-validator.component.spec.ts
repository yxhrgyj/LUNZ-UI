import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxLengthValidatorComponent } from './max-length-validator.component';

describe('MaxLengthValidatorComponent', () => {
  let component: MaxLengthValidatorComponent;
  let fixture: ComponentFixture<MaxLengthValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaxLengthValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaxLengthValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
