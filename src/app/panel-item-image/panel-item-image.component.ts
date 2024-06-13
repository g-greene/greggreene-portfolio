import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { PanelComponent } from '../panel.component';
import { Uuid } from '../Util';

@Component({
  selector: 'app-panel-item-image',
  templateUrl: './panel-item-image.component.html',
  styleUrls: ['./panel-item-image.component.css']
})
export class PanelItemImageComponent extends PanelComponent implements AfterViewInit {  
  override ngAfterViewInit(): void {
    this.onDerivedAfterViewInit.emit();
  }
}
