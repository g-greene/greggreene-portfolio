import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { PanelComponent } from '../panel.component';
import { Uuid } from '../Util';


@Component({
  selector: 'app-panel-item-photo',
  templateUrl: './panel-item-photo.component.html',
  styleUrls: ['./panel-item-photo.component.css']
})
export class PanelItemPhotoComponent extends PanelComponent implements AfterViewInit {  
  override ngAfterViewInit(): void {
    this.onDerivedAfterViewInit.emit();
  }
}
