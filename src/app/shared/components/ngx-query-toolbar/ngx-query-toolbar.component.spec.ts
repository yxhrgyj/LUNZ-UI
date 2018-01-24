import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxQueryToolbarComponent } from './ngx-query-toolbar.component';

describe('NgxQueryToolbarComponent', () => {
  let component: NgxQueryToolbarComponent;
  let fixture: ComponentFixture<NgxQueryToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxQueryToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxQueryToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
