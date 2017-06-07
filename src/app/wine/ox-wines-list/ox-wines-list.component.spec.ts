import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OxWinesListComponent } from './ox-wines-list.component';

describe('OxWinesListComponent', () => {
  let component: OxWinesListComponent;
  let fixture: ComponentFixture<OxWinesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OxWinesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OxWinesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
