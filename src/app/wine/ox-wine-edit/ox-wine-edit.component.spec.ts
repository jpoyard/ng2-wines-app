import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OxWineEditComponent } from './ox-wine-edit.component';

describe('OxWineEditComponent', () => {
  let component: OxWineEditComponent;
  let fixture: ComponentFixture<OxWineEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OxWineEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OxWineEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
