import { Component, OnInit, ElementRef } from '@angular/core';
import { Uuid } from '../Util';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  id = Uuid.create();
  el: any;

  constructor(_element: ElementRef) {
    this.el = _element;
   }

  ngOnInit(): void {
    // DEBUG
    // console.debug(this.el);
  }

  onClick(expression: string): void {
    eval(expression);
  }

}
