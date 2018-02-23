import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxValueValidatorComponent } from './max-value-validator.component';

describe('MaxValueValidatorComponent', () => {
  let component: MaxValueValidatorComponent;
  let fixture: ComponentFixture<MaxValueValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaxValueValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaxValueValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
