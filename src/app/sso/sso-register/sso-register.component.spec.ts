import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoRegisterComponent } from './sso-register.component';

describe('SsoRegisterComponent', () => {
  let component: SsoRegisterComponent;
  let fixture: ComponentFixture<SsoRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
