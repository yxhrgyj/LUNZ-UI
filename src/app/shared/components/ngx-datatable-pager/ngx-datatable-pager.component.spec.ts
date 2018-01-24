import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDatatablePagerComponent } from './ngx-datatable-pager.component';

describe('NgxDatatablePagerComponent', () => {
  let component: NgxDatatablePagerComponent;
  let fixture: ComponentFixture<NgxDatatablePagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxDatatablePagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDatatablePagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
