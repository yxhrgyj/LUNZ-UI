import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinValueValidatorComponent } from './min-value-validator.component';

describe('MinValueValidatorComponent', () => {
  let component: MinValueValidatorComponent;
  let fixture: ComponentFixture<MinValueValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinValueValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinValueValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
