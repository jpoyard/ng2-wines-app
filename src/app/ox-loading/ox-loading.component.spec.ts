import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OxLoadingComponent } from './ox-loading.component';

describe('OxLoadingComponent', () => {
  let component: OxLoadingComponent;
  let fixture: ComponentFixture<OxLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OxLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OxLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
