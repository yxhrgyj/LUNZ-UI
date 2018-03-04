import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinDateValidatorComponent } from './min-date-validator.component';

describe('MinDateValidatorComponent', () => {
  let component: MinDateValidatorComponent;
  let fixture: ComponentFixture<MinDateValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinDateValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinDateValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
