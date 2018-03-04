import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlValidatorComponent } from './url-validator.component';

describe('UrlValidatorComponent', () => {
  let component: UrlValidatorComponent;
  let fixture: ComponentFixture<UrlValidatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrlValidatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrlValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
