import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelItemImageComponent } from './panel-item-image.component';

describe('PanelItemImageComponent', () => {
  let component: PanelItemImageComponent;
  let fixture: ComponentFixture<PanelItemImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelItemImageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelItemImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
