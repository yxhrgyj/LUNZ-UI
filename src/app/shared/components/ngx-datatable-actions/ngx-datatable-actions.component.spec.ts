import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDatatableActionsComponent } from './ngx-datatable-actions.component';

describe('NgxDatatableActionsComponent', () => {
  let component: NgxDatatableActionsComponent;
  let fixture: ComponentFixture<NgxDatatableActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxDatatableActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDatatableActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
