import { Component, Input, Output, ViewChild, EventEmitter, Renderer2, OnInit, OnDestroy, ElementRef, Type } from '@angular/core';
import { Uuid } from './Util';
import { UserAgent } from './Util';

export interface PanelItemized {
    data: any;
    focused: EventEmitter<PanelComponent>;
}

@Component({
  template: './panel.component.html'
})
export abstract class PanelComponent implements PanelItemized {

  public component!: Type<any>;
  // public data: any,
  public ref: any = null

  _component: any;
  _: any;
  _background: any;
  _buttonClose: any;
  _flyout: any;
  _state: string = 'CLOSED';
  _parent: any;
  _flyoutHovering: boolean = false;

  onDerivedAfterViewInit: EventEmitter<any> = new EventEmitter<any>();

  @Input() data: any;
  @Input() id: string = Uuid.create();
  @Output() focused: EventEmitter<PanelComponent> = new EventEmitter();

  @ViewChild('sliderPanel', {static: false}) sliderPanel!: ElementRef;
  @ViewChild('sliderPanelButtonClose', {static: false}) sliderPanelButtonClose!: ElementRef;
  @ViewChild('sliderPanelBackground', {static: false}) sliderPanelBackground!: ElementRef;
  @ViewChild('sliderPanelFlyout', {static: false}) sliderPanelFlyout!: ElementRef;

  constructor (
    private _ref: ElementRef,
    private _renderer: Renderer2
  ) {

    console.debug(_ref);

    this._component = _ref.nativeElement;
    this._component.id = 'app_panel_item_' + Uuid.create();
    this._renderer.addClass(this._component, 'anim-slide-left');

      this.onDerivedAfterViewInit.subscribe(() => {

        this._buttonClose = this.sliderPanelButtonClose; // $('#slider_panel_' + this.data.id + ' .control-close');
        this._background = this.sliderPanelBackground; // $('#slider_panel_' + this.data.id + ' > .slider-panel-background');
        this._flyout = this.sliderPanelFlyout; // $('#slider_panel_' + this.data.id + ' .flyout'); //$('#slider_panel_' + this.data.id + ' .slider-panel-content .flyout');
        this._parent = this._ref.nativeElement.parent;

        var image = this.data.image,
        image_size = this.data.imageSize,
        image_position = this.data.imagePosition;

        if(image == '') {
          return;
        }

        this._background.nativeElement.style.backgroundImage = 'url(' + image + ')';
        this._background.nativeElement.style.backgroundRepeat = 'no-repeat';
        this._background.nativeElement.style.backgroundSize = image_size;
        this._background.nativeElement.style.backgroundPosition = image_position;

      });
  }


  ngOnInit(): void {
    window.addEventListener('closeopenpanels', (e:any) => {
      this.close();
    });
  }

  ngOnDestroy(): void {
    // $(window).off('closeopenpanels');
  }

  ngAfterViewInit(): void {
    
  }

  get Ref(): ElementRef {
    return this._ref;
  }

  get RefNativeElement(): ElementRef {
    return this._ref.nativeElement;
  }

  close(): void {
    var image_position = this.data.imagePosition;

    this._renderer.removeClass(document.body, 'mode--modal')

    this._.detach();
    this._.prependTo(this._parent);

    this.sliderPanel.nativeElement.style.top = 'unset';
    this.sliderPanel.nativeElement.style.left = 'unset';
    this.sliderPanel.nativeElement.style.position = 'relative';

    this._buttonClose.addClass('hide');
    this._background.addClass('hover-zoom');
    this._flyout.removeClass('hide');
    this._flyout.removeClass('clicked');

    this._state = 'CLOSED';

    window.dispatchEvent(new Event('closeslide'));

    setTimeout(() => {
      this._background.css('background-position', image_position);
    }, 900);
  }

  open(): void {
    if(!this._ref.nativeElement.classList.contains('focused')) {
      // alert('moving to slide');
      // this.focused.emit(this);
      return;
    }

    var w_width = window.innerWidth,
    p_width = 0,
    image_position_large = this.data.imagePositionLarge,
    image_position_mobile_large = this.data.imagePositionMobileLarge;

    this._renderer.appendChild(document.body, this._ref.nativeElement)

    //this._.detach();
    //this._.appendTo();

    // var overlay = $('.modal-overlay').detach();
    // overlay.appendTo(this._.parent().parent().parent().parent().parent());

    // this._.addClass('absolute');
    this._.css('position', 'absolute');
    this._.css('top', '10%');
    //this._.css('width', '30%');
    this._.css('height', '50%');
    this._.css('z-index', '20');

    this._buttonClose.removeClass('hide');
    this._flyout.removeClass('hide');
    this._background.removeClass('hover-zoom');

    this._state = 'OPEN';

    p_width = this._.width();

    this._.css('left', 'calc(100vw / 2 - ' + (p_width) / 2 + 'px)');

    //this._.addClass('anim-expand run');

    setTimeout(() => {
      this._renderer.addClass(document.body, 'mode--modal')
      //this._.css('width', '95%');
      this._.css('height', '75%');
      this._renderer.addClass(this.sliderPanelFlyout.nativeElement, 'clicked');

      if(UserAgent.isMobile()) {
        this._background.css('background-position', image_position_mobile_large != '' ? image_position_mobile_large : 'center top');
      }
      else {
        this._background.css('background-position', image_position_large);
      }
    }, 100);
  }

  onMouseOver(): void {
    //this._flyout.removeClass('hide');
    //setTimeout(() => {
      this._renderer.addClass(this.sliderPanelFlyout.nativeElement, 'clicked');
    //}, 90);
  }

  onMouseOut(): void {

  }

  onMouseLeave(): void {
    if(this._flyoutHovering && this._state == 'OPEN') {
      return;
    }

    this._renderer.removeClass(this.sliderPanelFlyout.nativeElement, 'clicked');
    setTimeout(() => {
      //this._flyout.addClass('hide');
      this._flyoutHovering = false;
    }, 300);
  }

  onMouseOverFlyout(): void {
    this._flyoutHovering = true;
  }

  onMouseLeaveFlyout(): void {
    this._flyoutHovering = false;
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
}


