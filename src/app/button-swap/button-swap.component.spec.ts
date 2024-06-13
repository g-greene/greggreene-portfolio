import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSwapComponent } from './button-swap.component';

describe('ButtonSwapComponent', () => {
  let component: ButtonSwapComponent;
  let fixture: ComponentFixture<ButtonSwapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonSwapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonSwapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
