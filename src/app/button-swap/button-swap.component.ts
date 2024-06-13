import { Component, Input, OnInit, OnDestroy, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { Uuid } from '../Util';
import { UserAgent } from '../Util';
import { Device } from '../Util';

@Component({
  selector: 'app-button-swap',
  templateUrl: './button-swap.component.html',
  styleUrls: ['./button-swap.component.css']
})
export class ButtonSwapComponent implements OnInit {

  id = Uuid.create();
  el: any;
  isHovering: boolean = false;
  _buttons: any = {};

  constructor(
    private _ref: ElementRef,
    private _renderer: Renderer2
    ) { 
  }

  currentButtonIndex = 0;

  ngOnInit(): void {
    window.addEventListener('onchangecontenttype', (e: any) => {
      let params = e.eventData || {};
      if(typeof params.contentType != 'undefined') {
        this.setButton(params.contentType, 'context' in params ? params.context : 'PASSIVE');
      }
    });
  }

  ngOnDestroy(): void {
    // $(window).off('onchangecontenttype');
  }

  ngAfterViewInit(): void {
    this._buttons = this._ref.nativeElement.children;
    this.initContentNextIcon();
  }

  onMouseOver(): void {
    this.isHovering = true;
  }

  onMouseOut(): void {
    this.isHovering = false;
  }

  onMouseLeave(): void {
    this.isHovering = false;
  }

  setButton(name: string, context: string = 'CLICK'): void {
    for(let i: number = 0; i < this._buttons.length; i++) {
      let e: any = this._buttons.item(i);

      this._renderer.removeClass(e, 'selected');
    
      if(name == e.attributes.getNamedItem('data-content-name')) {
        this._renderer.addClass(e, 'selected');
        this.currentButtonIndex = i;
        this.initContentNextIcon(context);
        return;
      }
    }
  }

  getNextButton(): Element {
    var next_index = -1;

    //alert(this.currentButtonIndex + ',' + this.buttons.length);

    if(this.currentButtonIndex + 1 >= this._buttons.length) {
      next_index = 0;
    }
    else if(this.currentButtonIndex < 0) {
      next_index = 0;
    }
    else {
      next_index = this.currentButtonIndex + 1;
    }

    //alert('using index: ' + next_index);
    console.debug(this._buttons[next_index]);

    return this._buttons[next_index];
  }

  initContentNextIcon(context: string = 'PASSIVE'): void {
    var button: Element = this.getNextButton();

    if(context == 'CLICK' || context == 'MENU_RADIAL') {
      setTimeout(() => {
        // $('#flyout_content_next').removeClass('clicked');
        // $('.flyout-content-next-icon').removeClass('run');
      }, 200);
    }

    setTimeout(() => {

      // this._appStateInfo.content['flyoutNextIcon'].nativeElement

      // $('.flyout-content-next-icon').removeClass((i, class_value) => {
      //   var class_names: string[] = class_value.split(' '),
      //   class_name = '';
        
      //   for (const i in class_names) {
      //     class_name = class_names[i];
      //     if(class_name.indexOf('fa-') == 0) {
      //       // DEBUG
      //       // alert('removing: ' + class_name);
      //       return class_name + ' fa-solid';
      //     }
      //   };

      //   return '';
      // });
      
      // $(button).attr('class', function(i, val) {
      //   if(val.indexOf('fa-') == 0) {
      //     $('.flyout-content-next-icon').addClass(val + ' fa-solid');
      //   }
      // });

      // if(context == 'CLICK' || context == 'MENU_RADIAL') {
      //   $('#flyout_content_next').addClass('clicked');
      //   $('.flyout-content-next-icon').addClass('run');

      //   setTimeout(() => {
      //     if(!this.isHovering || UserAgent.isMobile()) {
      //       $('#flyout_content_next').removeClass('clicked');
      //       $('.flyout-content-next-icon').removeClass('run');
      //     }
      //   }, 1500);
      // }

    }, 500);
  }

  nextButton(): void {
    for(let i: number = 0; i < this._buttons.length; i++) {
      let e: any = this._buttons.item(i);
      this._renderer.removeClass(e, 'selected');
    }

    if(this.currentButtonIndex + 1 >= this._buttons.length) {
      this.currentButtonIndex = 0;
    }
    else if(this.currentButtonIndex < 0) {
      this.currentButtonIndex = 0;
    }
    else {
      this.currentButtonIndex++;
    }

    var next_element = this.getNextButton();

    for(let i: number = 0; i < this._buttons.length; i++) {
      let e: any = this._buttons.item(i);
      if(i == this.currentButtonIndex) {
        this._renderer.addClass(e, 'selected');
        // $(window).trigger('onchangecontenttype', { contentType: $(e).attr('data-content-name'), context: 'CLICK' } );
        return;
      }
    }
  }

}
