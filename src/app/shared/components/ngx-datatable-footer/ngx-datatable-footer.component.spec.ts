import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDatatableFooterComponent } from './ngx-datatable-footer.component';

describe('NgxDatatableFooterComponent', () => {
  let component: NgxDatatableFooterComponent;
  let fixture: ComponentFixture<NgxDatatableFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxDatatableFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDatatableFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
