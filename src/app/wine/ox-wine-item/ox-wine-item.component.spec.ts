import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OxWineItemComponent } from './ox-wine-item.component';

describe('OxWineItemComponent', () => {
  let component: OxWineItemComponent;
  let fixture: ComponentFixture<OxWineItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OxWineItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OxWineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
