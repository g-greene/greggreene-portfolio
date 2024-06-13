import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeSavingComponent } from './badge-saving.component';

describe('BadgeSavingComponent', () => {
  let component: BadgeSavingComponent;
  let fixture: ComponentFixture<BadgeSavingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadgeSavingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadgeSavingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
