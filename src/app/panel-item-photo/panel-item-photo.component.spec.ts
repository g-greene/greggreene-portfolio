import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelItemPhotoComponent } from './panel-item-photo.component';

describe('PanelItemPhotoComponent', () => {
  let component: PanelItemPhotoComponent;
  let fixture: ComponentFixture<PanelItemPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelItemPhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelItemPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
