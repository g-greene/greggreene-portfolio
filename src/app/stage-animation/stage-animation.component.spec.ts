import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageAnimationComponent } from './stage-animation.component';

describe('StageAnimationComponent', () => {
  let component: StageAnimationComponent;
  let fixture: ComponentFixture<StageAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StageAnimationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StageAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
