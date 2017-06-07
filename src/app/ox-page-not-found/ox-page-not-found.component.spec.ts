import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OxPageNotFoundComponent } from './ox-page-not-found.component';

describe('OxPageNotFoundComponent', () => {
  let component: OxPageNotFoundComponent;
  let fixture: ComponentFixture<OxPageNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OxPageNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OxPageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
