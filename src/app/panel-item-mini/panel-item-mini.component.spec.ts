import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelItemMiniComponent } from './panel-item-mini.component';

describe('PanelItemMiniComponent', () => {
  let component: PanelItemMiniComponent;
  let fixture: ComponentFixture<PanelItemMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelItemMiniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelItemMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
