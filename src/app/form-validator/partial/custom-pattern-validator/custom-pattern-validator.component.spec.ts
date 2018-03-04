import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomPatternValidatorComponent } from './custom-pattern-validator.component';

describe('CustomPatternValidatorComponent', () => {
  let component: CustomPatternValidatorComponent;
  let fixture: ComponentFixture<CustomPatternValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomPatternValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomPatternValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
