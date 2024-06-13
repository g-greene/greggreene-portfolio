import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { Directive, ViewContainerRef } from '@angular/core';
import { PanelDirective } from '../panel.directive';
import { PanelItem } from '../panel-item';
import { PanelComponent } from '../panel.component';

import { AppStateInfo } from '../app-state-info';
import { EventHubService } from '../event-hub.service';

@Component({
  selector: 'app-slider-mini',
  templateUrl: './slider-mini.component.html',
  styleUrls: ['./slider-mini.component.css']
})
export class SliderMiniComponent implements OnInit {

  @Input() _panels: PanelItem[] = [];

  _activePanelIndex = -1;
  _lastTimeout: any = null;
  _isHovering: boolean = false;

  _sliderContentPositionInitial: number = 0.0;

  @ViewChild(PanelDirective, {static: true}) panelHost!: PanelDirective;
  @ViewChild('sliderAreaForward', {static: false}) sliderAreaForward!: ElementRef;
  @ViewChild('sliderAreaBackward', {static: false}) sliderAreaBackward!: ElementRef;
  @ViewChild('sliderButtonForward', {static: false}) sliderButtonForward!: ElementRef;
  @ViewChild('sliderButtonBackward', {static: false}) sliderButtonBackward!: ElementRef;
  @ViewChild('sliderContent', {static: false}) sliderContent!: ElementRef;

  constructor (
    private _renderer: Renderer2
  ) {

  }

  ngOnInit(): void {

    window.addEventListener('resize', (e: any) => {
      clearTimeout(this._lastTimeout);
      this._reloadContent();
    });

    window.addEventListener('orientationchange', (e: any) => {
      clearTimeout(this._lastTimeout);
      this._reloadContent();
    });

    EventHubService.getInstance().reloadContent$.subscribe(typeCode => {
      this._reloadContent();
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this._lastTimeout);
  }

  ngAfterViewInit(): void {
    if(this._panels.length == 0) {
      return;
    }

    // for(var i = 0; i < this._panels.length; i++) {  
    //   const panelItem = this._panels[i];
    //   const p: any = document.getElementById('slider_mini_panel_' + this._panels[i].data.id);
    //   if(i==0) {
    //     this._renderer.addClass(p, 'focused');
    //   }
    // }

    // this.updateControls();

    // setTimeout(() => {
    //   this.cycle();
    // }, 2000
  // );
  }

  private _reloadContent(): void {
    clearTimeout(this._lastTimeout);
    this._isHovering = false;
    this._loadComponent();
    this._activePanelIndex = -1;

    this._initPositions();

    setTimeout(() => {
        this.cycle();
      }, 2000
    );
  }

  private _initPositions(): void {
    const panelItem = this._panels[0];

    console.debug('--- _initPositions (mini)');
    console.debug('panelItem:');
    console.debug(panelItem);

    let panel: any = panelItem.ref.nativeElement,
      windowWidth = typeof window == 'undefined' ? 0 : window.innerWidth,
      panelWidth = typeof panel == 'undefined' ? 0 : panel.clientWidth,
      panelLeft = panel.getBoundingClientRect().left,
      sliderContentLeft = this.sliderContent.nativeElement.getBoundingClientRect().left,
      sliderContentWidth = this.sliderContent.nativeElement.getBoundingClientRect().width;

    console.debug('--- _initPositions');
    // console.debug('content type code: ' + this._activeContentTypeCode);
    console.debug('windowWidth: ' + window.innerWidth);
    console.debug('panelWidth: ' + panel.clientWidth);
    console.debug('panelLeft: ' + panel.getBoundingClientRect().left);
    console.debug('content container (offset left): ' + (((windowWidth! / 2) - (panelWidth! / 2))) + 'px');
    console.debug('---');

    // move the whole content track
    this.sliderContent.nativeElement.style.left = 0 + (panelWidth! * 0.025) + 'px';

    this._sliderContentPositionInitial = this.sliderContent.nativeElement.getBoundingClientRect().left;
  }

  cycle(): void {
    //alert(this._activePanelIndex);

    clearTimeout(this._lastTimeout);

    if(this._isHovering) {
      return;
    }

    if(this._activePanelIndex + 1 >= this._panels.length) {
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
      }, 125
    );

    this._lastTimeout = setTimeout(() => {
      this.cycle();
      }, 9000
    );

    // TODO: review setInterval
    // this._lastTimeout = setInterval(() => {
    //   this.cycle();
    // }, 3000);
  }

  onClickMain(): void {
    clearTimeout(this._lastTimeout);

    this._lastTimeout = setTimeout(() => {
      this.cycle();
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
      this.cycle();
      }, 500
    );
  }

  slideForward(): void {
    if(this._activePanelIndex + 1 >= this._panels.length) {
      return;
    }

    this._activePanelIndex++;

    this.moveToSlide(this._activePanelIndex);
  }

  slideBackward(): void {
    if(this._activePanelIndex - 1 < 0) {
      return;
    }

    this._activePanelIndex--;

    this.moveToSlide(this._activePanelIndex);
  }

  // moveToSlide(index: number): void {
  //   const panel_item = this._panels[index];

  //   // get the interior mini panel content container
  //   let panel: any = document.getElementById('slider_mini_panel_' + panel_item.data.id),
  //     window_width = typeof window == 'undefined' ? 0 : window.innerWidth,
  //     panel_width = typeof panel == 'undefined' ? 0 : panel.getBoundingClientRect().width,
  //     panel_left = panel.getBoundingClientRect().left;

  //   this._activePanelIndex = index;


  //   console.debug('mini panel (left): ' + ((-1 * panel_left) + ((window_width! - panel_width!) / 2)) + 'px');

  //   this.sliderContent.nativeElement.style.left = ((-1 * panel_left) + ((window_width! - panel_width!) / 2)) + 'px';

  //   // setTimeout( () => {
  //   //     $('.slider-mini-content .slider-mini-panel').removeClass('focused');
  //   //     panel.addClass('focused');
  //   //   }, 500
  //   // );

  //   this.updateControls();
  // }

  moveToSlide(index: number): void {
    let panelItem: any = this._panels[index],
      panelItemPrevious: any = null;

    console.debug('panelItem:');
    console.debug(panelItem);

    let panel: any = panelItem.ref.nativeElement,
      panelPrevious: any = null,
      windowWidth = typeof window == 'undefined' ? 0 : window.innerWidth,
      panelWidth = typeof panel == 'undefined' ? 0 : panel.clientWidth,
      panelLeft = panel.getBoundingClientRect().left,
      sliderContentLeft = this.sliderContent.nativeElement.getBoundingClientRect().left;

    this._activePanelIndex = index;

    console.debug('--- mini');
    //console.debug('content type code: ' + this._activeContentTypeCode);
    console.debug('windowWidth: ' + window.innerWidth);
    console.debug('panelWidth: ' + panel.clientWidth);
    console.debug('panelLeft: ' + panel.getBoundingClientRect().left);
    console.debug('content container (offset left): ' + (((windowWidth! / 2) - (panelWidth! / 2))) + 'px');
    console.debug('---');

    // move the whole content track
    if(index + 1 == this._panels.length) {
      this._initPositions();
    }
    else if(index > 0) {
      panelItemPrevious = this._panels[index];
      panelPrevious = panelItemPrevious.ref.nativeElement;
      this.sliderContent.nativeElement.style.left = sliderContentLeft - ((panelWidth!) + (115)) + 'px';
    }
    else {
      this.sliderContent.nativeElement.style.left = sliderContentLeft - ((panelWidth!) + (115)) + 'px';
    }

    // setTimeout( () => {
    //     let sliderPanels:HTMLCollectionOf<Element> = document.getElementsByClassName('slider-panel');

    //     for(let i:number = 0; i < sliderPanels.length; i++) {
    //       this._renderer.removeClass(sliderPanels.item(i), 'focused');
    //     }

    //     // alert(panel);

    //     this._renderer.addClass(panel, 'focused');
    //   }, 500);

    this.updateControls();
  }

  updateControls(): void {
    if(this._activePanelIndex <= 0) {
      this._renderer.addClass(this.sliderAreaBackward.nativeElement, 'hide');
    }
    else {
      this._renderer.removeClass(this.sliderAreaBackward.nativeElement, 'hide');
    }

    if(this._activePanelIndex + 1 >= this._panels.length) {
      this._renderer.addClass(this.sliderAreaForward.nativeElement, 'hide');
    }
    else {
      this._renderer.removeClass(this.sliderAreaForward.nativeElement, 'hide');
    }
  }

  _loadComponent(): void {
    const viewContainerRef = this.panelHost.viewContainerRef;
    viewContainerRef.clear();

    for(var i = 0; i < this._panels.length; i++) {
      const panelItem = this._panels[i];
      // const componentRef = viewContainerRef.createComponent<PanelComponent>(panelItem.component);
      const panelRef = viewContainerRef.createComponent<PanelComponent>(panelItem.component);

      panelItem.ref = panelRef.instance.Ref;

      panelRef.instance.data = panelItem.data;
      // panelRef.instance.focused.subscribe(this.onPanelFocused.bind(this));

      // componentRef.instance.data = panelItem.data;
    }
  }
}
