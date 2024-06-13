import { Component, Input, OnDestroy, OnInit, ViewChild, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { Directive, ViewContainerRef } from '@angular/core';
import { PanelDirective } from '../panel.directive';
import { PanelItem } from '../panel-item';
import { PanelItemWebsiteComponent } from '../panel-item-website/panel-item-website.component';
import { PanelItemImageComponent } from '../panel-item-image/panel-item-image.component';
import { PanelItemPhotoComponent } from '../panel-item-photo/panel-item-photo.component';
import { PanelComponent, PanelItemized } from '../panel.component';

import { AppStateInfo } from '../app-state-info';
import { EventHubService } from '../event-hub.service';

import { Util, Device } from '../Util';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit, OnDestroy {

  _appStateInfo: AppStateInfo;

  _panelsInContext: PanelItem[] = [];
  
  _lastTimeout: any;
  _isHovering: boolean = false;
  _activeContentTypeCode: string = '';
  _activePanelIndex = 0;

  _sliderContentOffset: number = 0;
  _sliderContentPositionInitial: number = 0.0;

  @Input() panels: PanelItem[] = [];

  @ViewChild('sliderAreaForward', {static: false}) sliderAreaForward!: ElementRef;
  @ViewChild('sliderAreaBackward', {static: false}) sliderAreaBackward!: ElementRef;
  @ViewChild('sliderButtonForward', {static: false}) sliderButtonForward!: ElementRef;
  @ViewChild('sliderButtonBackward', {static: false}) sliderButtonBackward!: ElementRef;
  @ViewChild('sliderContent', {static: false}) sliderContent!: ElementRef;
  
  @ViewChild(PanelDirective, {static: true}) panelHost!: PanelDirective;

  
  constructor (
    private _ref: ElementRef,
    private _renderer: Renderer2
  ) {
    this._appStateInfo = new AppStateInfo();

    EventHubService.getInstance().contentTypeChanged$.subscribe(typeCode => {
      this._activeContentTypeCode = typeCode;
    });
  }

  ngOnInit(): void {
    window.addEventListener('resize', (e: any) => {
      clearTimeout(this._lastTimeout);
      this._lastTimeout = setTimeout(() => {
        this._reloadContent();
      }, 1000);
    });

    window.addEventListener('orientationchange', (e: any) => {
      clearTimeout(this._lastTimeout);
      this._lastTimeout = setTimeout(() => {
        this._reloadContent();
      }, 1000);
    });

    window.addEventListener('closeslide', (e: any) => {
      //alert('close slide');
      this._lastTimeout = setTimeout(() => {
        this._cycle();
      }, 500);
    });

    EventHubService.getInstance().reloadContent$.subscribe(typeCode => {
      this._activeContentTypeCode = typeCode;
      this._reloadContent();
    });
  }

  ngOnDestroy(): void {
    clearInterval(this._lastTimeout);
  }

  ngAfterViewInit(): void {
    // if(this._panelsInContext.length == 0) {
    //   return;
    // }

    // for(var i = 0; i < this._panelsInContext.length; i++) {  
    //   const panelItem = this._panelsInContext[i];
    //   const panel: any = document.getElementById('slider_panel_' + this._panelsInContext[i].data.id);

    //   // alert('slider_panel_' + this._panelsInContext[i].data.id);

    //   const parent = this._ref.nativeElement; // panel.parent;

    //   if(i==0) {
    //     // this._renderer.addClass(panel, 'focused');
    //   }

    //   // parent.style['--slide-x-start'] = '-500' + 'px';
    //   // parent.style['--slide-x-end'] = '0' + 'px';
    //   // parent.style['animation-duration'] = '1200ms';
    //   // parent.style['animation-timing-function'] = 'cubic-bezier(0.8,-0.27,0.025,1.105)';
    //   // parent.style['animation-delay'] = (200 * i) + 'ms';

    //   // this._renderer.addClass(parent, 'run');
    // }

    this.updateControls();

    // setTimeout(()=> {
    //   // let panelItemWebsite: any = document.getElementsByTagName('app-panel-item-website').item(0);
    //   // this._renderer.removeClass(panelItemWebsite, 'run');
    //   this._cycle();
    // }, 1500);
  }

  private _reloadContent(): void {
    clearTimeout(this._lastTimeout);
    this._isHovering = false;
    this._panelsInContext = [];
    this._loadComponent();
    this._activePanelIndex = 0;

    if(!Device.isMobile()) {
      this._sliderContentOffset = 20.0;
    }
    else {
      this._sliderContentOffset = 0;
    }

    this._initPositions();

    setTimeout(() => {
        this._cycle();
      }, 3000
    );
  }

  private _initPositions(): void {
    const panelItem: any = this._panelsInContext[this._activePanelIndex];
    this.sliderContent.nativeElement.style.left = '0px';

    console.debug('--- _initPositions');
    console.debug('panelItem:');
    console.debug(panelItem);

    let panel: any = panelItem.ref.nativeElement,
      windowWidth = typeof window == 'undefined' ? 0 : window.innerWidth,
      panelWidth = typeof panel == 'undefined' ? 0 : panel.clientWidth,
      offsetLeft = typeof panel == 'undefined' ? 0 : panel.offsetLeft,
      panelLeft = panel.getBoundingClientRect().left,
      sliderContentLeft = this.sliderContent.nativeElement.getBoundingClientRect().left;

    console.debug('--- _initPositions');
    console.debug('_activePanelIndex: ' + this._activePanelIndex);
    console.debug('content type code: ' + this._activeContentTypeCode);
    console.debug('windowWidth: ' + window.innerWidth);
    console.debug('panelWidth: ' + panel.clientWidth);
    console.debug('panelLeft: ' + panel.getBoundingClientRect().left);
    console.debug('offsetLeft: ' + offsetLeft);
    console.debug('content container (offset left): ' + (((windowWidth! / 2) - (panelWidth! / 2))) + 'px');
    console.debug('---');

    // move the whole content track
    // this.sliderContent.nativeElement.style.left = ((windowWidth! / 2) - (panelWidth! / 2)) + 'px';
    this.sliderContent.nativeElement.style.left = ((offsetLeft) - (panelWidth! / 2)) + (windowWidth / 2) - this._sliderContentOffset + 'px';

    this._sliderContentPositionInitial = this.sliderContent.nativeElement.getBoundingClientRect().left;

    this._applyFocus(panelItem);


  }

  private _cycle(): void {
    clearTimeout(this._lastTimeout);

    if(this._isHovering) {
      return;
    }

    //alert(this._activePanelIndex);
    if(this._activePanelIndex + 1 >= this._panelsInContext.length) {
      this.sliderContent.nativeElement.style.right = '0px';
      this._activePanelIndex = 0;
    }
    else if(this._activePanelIndex < 0) {
      this._activePanelIndex = 0;
    }
    else {
      this._activePanelIndex++;
    }

    setTimeout( () => {
      this.moveToSlide(this._activePanelIndex);
      }, 2000
    );

    this._lastTimeout = setTimeout(() => {
      this._cycle();
      }, 3000
    );

    // TODO: review setInterval
    // this._lastTimeout = setInterval(() => {
    //   this._cycle();
    // }, 3000);
  }

  private _clearFocus(): void {
    let sliderPanels:HTMLCollectionOf<Element> = document.body.getElementsByClassName('slider-panel');
    for(let i:number = 0; i < sliderPanels.length; i++) {
      this._renderer.removeClass(sliderPanels.item(i), 'focused');
    }
  }

  private _applyFocus(panelItem: any): void {
    setTimeout(() => {
      let sliderPanels:HTMLCollectionOf<Element> = document.body.getElementsByClassName('slider-panel'),
        sliderPanel: any = panelItem.ref.nativeElement.getElementsByClassName('slider-panel').item(0);

      for(let i:number = 0; i < sliderPanels.length; i++) {
        this._renderer.removeClass(sliderPanels.item(i), 'focused');
      }
      this._renderer.addClass(sliderPanel, 'focused');
    }, 0);
  }

  onClickMain(): void {
    clearTimeout(this._lastTimeout);

    this._lastTimeout = setTimeout(() => {
      this._cycle();
      }, 10000
    );
  }

  onMouseOverMain(): void {
    this._isHovering = true;
    clearTimeout(this._lastTimeout);
  }

  onMouseOutMain(): void {
    this._isHovering = false;
    this._lastTimeout = setTimeout(() => {
      this._cycle();
      }, 500
    );
  }

  onPanelFocused(eventData: PanelComponent): void {
    console.debug(eventData);
    console.debug(this);
    this.moveToSlideByObject(eventData);
  }

  slideForward(): void {
    if(this._activePanelIndex + 1 >= this._panelsInContext.length) {
      return;
    }

    clearTimeout(this._lastTimeout);

    this._activePanelIndex++;

    this.moveToSlide(this._activePanelIndex);
  }

  slideBackward(): void {
    if(this._activePanelIndex - 1 < 0) {
      return;
    }

    clearTimeout(this._lastTimeout);

    this._activePanelIndex--;

    this.moveToSlide(this._activePanelIndex);
  }

  moveToSlideByObject(panel: PanelComponent): void {
    if(!panel) {
      return;
    }

    for(var i = 0; i < this._panelsInContext.length; i++) {
      if(this._panelsInContext[i].data.id == panel.data.id) {
        clearTimeout(this._lastTimeout);
        this._isHovering = true;
        this.moveToSlide(i);
        return;
      }
    }
  }

  moveToSlide(index: number): void {
    const panelItem = this._panelsInContext[index];

    console.debug('panelItem (moveToSlide):');
    console.debug('index: ' + index);
    console.debug(panelItem);

    let panel: any = panelItem.ref.nativeElement,
      windowWidth = typeof window == 'undefined' ? 0 : window.innerWidth,
      panelWidth = typeof panel == 'undefined' ? 0 : panel.clientWidth,
      offsetLeft = typeof panel == 'undefined' ? 0 : panel.offsetLeft,
      panelLeft = panel.getBoundingClientRect().left,
      sliderContentLeft = this.sliderContent.nativeElement.getBoundingClientRect().left;

    console.debug('---');
    console.debug('_activePanelIndex: ' + this._activePanelIndex);
    console.debug('content type code: ' + this._activeContentTypeCode);
    console.debug('windowWidth: ' + window.innerWidth);
    console.debug('panelWidth: ' + panel.clientWidth);
    console.debug('panelLeft: ' + panel.getBoundingClientRect().left);
    console.debug('offsetLeft: ' + offsetLeft);
    console.debug('content container (offset left): ' + (((windowWidth! / 2) - (panelWidth! / 2))) + 'px');
    console.debug('---');

    // move the whole content track
    
    this.sliderContent.nativeElement.style.left = (-1 * ((offsetLeft) + (panelWidth! / 2))) + (windowWidth / 2) - this._sliderContentOffset + 'px';

    this._applyFocus(this._panelsInContext[index]);

    this.updateControls();

    if(index + 1 == this._panelsInContext.length) {
      clearTimeout(this._lastTimeout);
      setTimeout(() => {
        this._reloadContent();
      }, 2000);
    }
  }

  updateControls(): void {
    if(this._activePanelIndex <= 0) {
      this._renderer.addClass(this.sliderAreaBackward.nativeElement, 'hide');
    }
    else {
      this._renderer.removeClass(this.sliderAreaBackward.nativeElement, 'hide');
    }

    if(this._activePanelIndex + 1 >= this._panelsInContext.length) {
      this._renderer.addClass(this.sliderAreaForward.nativeElement, 'hide');
    }
    else {
      this._renderer.removeClass(this.sliderAreaForward.nativeElement, 'hide');
    }
  }

  _loadComponent(): void {
    const viewContainerRef = this.panelHost.viewContainerRef;
    viewContainerRef.clear();

    for(let i: number = 0; i < this.panels.length; i++) {
      // DEBUG
      // console.debug(this._activeContentTypeCode);
      // console.debug(this.panels[i].component.name);

      if(this._activeContentTypeCode == 'web') {
        if(this.panels[i].type != 'web') {
          console.debug('skipping: ' + this.panels[i].component.name);
          continue;
        }
      }
      else if(this._activeContentTypeCode == 'image') {
        if(this.panels[i].type != 'image') {
          console.debug('skipping: ' + this.panels[i].component.name);
          continue;
        }
      }
      else if(this._activeContentTypeCode == 'photo') {
        if(this.panels[i].type != 'photo') {
          console.debug('skipping: ' + this.panels[i].component.name);
          continue;
        }
      }

      // add only contextual (e.g. web) panels
      this._panelsInContext.push(this.panels[i]);

      const panelItem = this.panels[i];
      // const componentRef = viewContainerRef.createComponent<PanelItemized>(panelItem.component);
      const panelRef = viewContainerRef.createComponent<PanelComponent>(panelItem.component);

      panelItem.ref = panelRef.instance.Ref;

      // console.debug("componentRef.instance");
      // console.debug(componentRef.instance);

      panelRef.instance.data = panelItem.data;
      panelRef.instance.focused.subscribe(this.onPanelFocused.bind(this));

      // componentRef.instance.data = panelItem.data;
      // componentRef.instance.focused.subscribe(this.onPanelFocused.bind(this));
    }

    console.debug(this._panelsInContext);
  }
}
