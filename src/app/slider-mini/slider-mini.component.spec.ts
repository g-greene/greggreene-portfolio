import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderMiniComponent } from './slider-mini.component';

describe('SliderMiniComponent', () => {
  let component: SliderMiniComponent;
  let fixture: ComponentFixture<SliderMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderMiniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
