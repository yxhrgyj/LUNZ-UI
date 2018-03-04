import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxDateValidatorComponent } from './max-date-validator.component';

describe('MaxDateValidatorComponent', () => {
  let component: MaxDateValidatorComponent;
  let fixture: ComponentFixture<MaxDateValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaxDateValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaxDateValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
