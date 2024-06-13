import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelItemWebsiteComponent } from './panel-item-website.component';

describe('PanelItemWebsiteComponent', () => {
  let component: PanelItemWebsiteComponent;
  let fixture: ComponentFixture<PanelItemWebsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelItemWebsiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelItemWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
