import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SliderComponent } from './slider/slider.component';
import { SliderPanelComponent } from './slider-panel/slider-panel.component';
import { PanelDirective } from './panel.directive';
import { PanelService } from './panel.service';
import { PanelItemWebsiteComponent } from './panel-item-website/panel-item-website.component';
import { PanelItemImageComponent } from './panel-item-image/panel-item-image.component';
import { PuckComponent } from './puck/puck.component';
import { ButtonComponent } from './button/button.component';
import { ClickableDirective } from './clickable.directive';
import { SliderMiniComponent } from './slider-mini/slider-mini.component';
import { PanelItemMiniComponent } from './panel-item-mini/panel-item-mini.component';
import { ButtonSwapComponent } from './button-swap/button-swap.component';
import { PanelItemPhotoComponent } from './panel-item-photo/panel-item-photo.component';
import { HoverableDirective } from './hoverable.directive';

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    SliderPanelComponent,
    PanelDirective,
    PanelItemWebsiteComponent,
    PanelItemImageComponent,
    PuckComponent,
    ButtonComponent,
    ClickableDirective,
    SliderMiniComponent,
    PanelItemMiniComponent,
    ButtonSwapComponent,
    PanelItemPhotoComponent,
    HoverableDirective
  ],
  imports: [
    BrowserModule,
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    PanelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
