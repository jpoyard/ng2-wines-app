import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OxHomeComponent } from './ox-home.component';

describe('OxHomeComponent', () => {
  let component: OxHomeComponent;
  let fixture: ComponentFixture<OxHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OxHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OxHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
