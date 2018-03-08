import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FromDemoComponent } from './from-demo.component';

describe('FromDemoComponent', () => {
  let component: FromDemoComponent;
  let fixture: ComponentFixture<FromDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FromDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FromDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
