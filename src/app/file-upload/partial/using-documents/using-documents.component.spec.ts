import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsingDocumentsComponent } from './using-documents.component';

describe('UsingDocumentsComponent', () => {
  let component: UsingDocumentsComponent;
  let fixture: ComponentFixture<UsingDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsingDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsingDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
