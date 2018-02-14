import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateValidatorComponent } from './date-validator.component';

describe('DateValidatorComponent', () => {
  let component: DateValidatorComponent;
  let fixture: ComponentFixture<DateValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
