import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoCheckComponent } from './sso-check.component';

describe('SsoCheckComponent', () => {
  let component: SsoCheckComponent;
  let fixture: ComponentFixture<SsoCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
