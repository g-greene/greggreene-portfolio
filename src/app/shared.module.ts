import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatRippleHoverDirective } from './mat-ripple-hover.directive';
import { DialogGenericComponent } from './dialog-generic/dialog-generic.component';

import { BadgeSavingComponent } from './badge-saving/badge-saving.component';
import { StageAnimationComponent, StageAnimationHeaderComponent, StageAnimationBodyComponent, StageAnimationFooterComponent } from './stage-animation/stage-animation.component';

import { AutoTriggerDirective } from './auto-trigger.directive';

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { BaseService } from './base.service';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule}  from '@angular/material/expansion';
import { MatListModule}  from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    MatRippleHoverDirective,
    DialogGenericComponent,
    AutoTriggerDirective,
    BadgeSavingComponent,
    StageAnimationComponent,
    StageAnimationHeaderComponent,
    StageAnimationBodyComponent,
    StageAnimationFooterComponent
  ],
  providers: [
    BaseService,
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
  imports: [
    // BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatIconModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatTableModule,
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
    MatTreeModule,
    MatSortModule,
    CommonModule,
  ],
  exports: [
    // BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatRippleHoverDirective,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatTableModule,
    MatExpansionModule,
    MatListModule,
    MatTooltipModule,
    MatTreeModule,
    MatSortModule,
    DialogGenericComponent,
    AutoTriggerDirective,
    BadgeSavingComponent,
    StageAnimationComponent,
    StageAnimationHeaderComponent,
    StageAnimationBodyComponent,
    StageAnimationFooterComponent
  ],
})
export class SharedModule { }
