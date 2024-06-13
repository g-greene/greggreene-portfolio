import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { PanelComponent } from '../panel.component';
import { Uuid } from '../Util';

@Component({
  selector: 'app-panel-item-mini',
  templateUrl: './panel-item-mini.component.html',
  styleUrls: ['./panel-item-mini.component.css']
})
export class PanelItemMiniComponent extends PanelComponent {

}