import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotEqualToValidatorComponent } from './not-equal-to-validator.component';

describe('NotEqualToValidatorComponent', () => {
  let component: NotEqualToValidatorComponent;
  let fixture: ComponentFixture<NotEqualToValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotEqualToValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotEqualToValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
