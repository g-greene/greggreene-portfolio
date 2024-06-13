import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { PanelComponent } from '../panel.component';
import { Uuid } from '../Util';

@Component({
  selector: 'app-panel-item-website',
  templateUrl: './panel-item-website.component.html',
  styleUrls: ['./panel-item-website.component.css']
})
export class PanelItemWebsiteComponent extends PanelComponent implements AfterViewInit {  
  
  override ngAfterViewInit(): void {
    this.onDerivedAfterViewInit.emit();
  }
  
/*
  _: any;
  _background: any;
  _buttonClose: any;
  _flyoutContent: any;
  _state: string = 'CLOSED';
  parent: any;

  @Input() data: any;
  @Input() id: string = Uuid.create();
  @Output() focused: EventEmitter<PanelComponent> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    $(window).on('closeopenpanels', () => {
      this.close();
    });
  }

  ngOnDestroy(): void {
    $(window).off('closeopenpanels');
  }



  ngAfterViewInit(): void {
    this._ = $('#slider_panel_' + this.data.id);
    this._buttonClose = $('#slider_panel_' + this.data.id + ' .control-close');
    this._background = $('#slider_panel_' + this.data.id + ' > .slider-panel-background');
    this._flyoutContent = $('#slider_panel_' + this.data.id + ' .slider-panel-content .flyout');
    this.parent = this._.parent();

    var image = this.data.image,
    image_size = this.data.imageSize;

    if(image == '') {
      return;
    }

    this._background.css('background-image', 'url(' + image + ')');
    this._background.css('background-repeat', 'no-repeat');
    this._background.css('background-size', image_size);
  }

  close(): void {
    $(document.body).removeClass('mode--modal');

    this._.detach();
    this._.appendTo(this.parent);

    this._.css('position', 'static');

    this._buttonClose.addClass('hide');
    this._background.addClass('hover-zoom');
    this._flyoutContent.removeClass('hide');
    this._flyoutContent.removeClass('clicked');

    this._state = 'CLOSED';

    setTimeout(() => {
      this._.css('background-position', 'left top');
    }, 900);
  }

  open(): void {
    if(!this._.hasClass('focused')) {
      // alert('moving to slide');
      this.focused.emit(this);
      return;
    }

    var w = $(window),
    w_width = w.width(),
    p_width = 0;

    this._.detach();
    this._.appendTo(document.body);
    // var overlay = $('.modal-overlay').detach();
    // overlay.appendTo(this._.parent().parent().parent().parent().parent());

    // this._.addClass('absolute');
    this._.css('position', 'absolute');
    this._.css('top', '10%');
    //this._.css('width', '30%');
    this._.css('height', '50%');
    this._.css('z-index', '20');

    this._buttonClose.removeClass('hide');
    this._flyoutContent.removeClass('hide');
    this._background.removeClass('hover-zoom');

    this._state = 'OPEN';

    p_width = this._.width();

    this._.css('left', 'calc(100vw / 2 - ' + (p_width) / 2 + 'px)');

    //this._.addClass('anim-expand run');

    setTimeout(() => {
      $(document.body).addClass('mode--modal');
      //this._.css('width', '95%');
      this._.css('height', '75%');
      this._flyoutContent.addClass('clicked');
      //this._.css('background-position', 'center top');
    }, 100);
  }

  onMouseOver(): void {
    this._flyoutContent.removeClass('hide');
    setTimeout(() => {
       this._flyoutContent.addClass('clicked');
    }, 300);
  }

  onMouseOut(): void {
    this._flyoutContent.removeClass('clicked');
    setTimeout(() => {
    this._flyoutContent.addClass('hide');
    }, 300);
  }

  onClickClose(event: any): void {
    event.stopPropagation();
    this.close();
  }

  onClick(): void {
    if(this._state == 'CLOSED') {
      this.open();
    }
    else {
      this.close();
    }
  }
*/

}


