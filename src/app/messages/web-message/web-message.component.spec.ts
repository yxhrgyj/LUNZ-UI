import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebMessageComponent } from './web-message.component';

describe('WebMessageComponent', () => {
  let component: WebMessageComponent;
  let fixture: ComponentFixture<WebMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
