import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OxWineViewComponent } from './ox-wine-view.component';

describe('OxWineViewComponent', () => {
  let component: OxWineViewComponent;
  let fixture: ComponentFixture<OxWineViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OxWineViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OxWineViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
