import { Component, ElementRef, Input, ViewChild, Renderer2, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'stage-animation',
  templateUrl: './stage-animation.component.html',
  styleUrls: ['./stage-animation.component.css']
})
export class StageAnimationComponent implements OnInit, AfterViewInit {

  @Input() stageType: string = 'SPOTLIGHT';
  @Input() stageZIndex: string = '25000';
  @Input() lightColor: string = '#eeeeee60';
  @Input() lightShape: string = 'circle';
  @Input() lightPosition: string = 'center center';
  @Input() backgroundColor: string = '#00000050';

  constructor (
    public _ref: ElementRef, 
    public _renderer: Renderer2 
    ) {

  }

  ngOnInit(): void {
    this._renderer.setAttribute(this._ref.nativeElement, 'style', 'display:none;position:absolute;top:0;left:0;width:100%;height:100%;');
  }

  ngAfterViewInit(): void {

    let style: string = '';

    if(this.stageType == 'SPOTLIGHT') {
      this.lightShape = 'circle';
      style='top: 0; left: 0; backdrop-filter: blur(5px); background-image: radial-gradient(' + this.lightShape + ' farthest-side at 50% 50%, transparent, ' + this.lightColor + ',' + this.backgroundColor + '); background-position: ' + this.lightPosition + '; background-repeat: no-repeat;';
    }
    if(this.stageType == 'SOLID') {
      this.lightShape = 'solid';
      style='top: 0; left: 0; backdrop-filter: blur(5px); background-color:' + this.lightColor + ';';
    }
    else {
      this.lightShape = 'unset';
      style='top: 0; left: 0; backdrop-filter: blur(5px); background-image: gradient(' + this.lightShape + ' farthest-side at 50% 50%, transparent, ' + this.lightColor + ',' + this.backgroundColor + '); background-position: ' + this.lightPosition + '; background-repeat: no-repeat;';
    }

    this._renderer.setAttribute(this._ref.nativeElement, 'style', style);
    // this.renderer.setAttribute(this.ref.nativeElement, 'class', '');
  }

  public show(params: any = {}): void {
    var self = this;
    if('delay' in params) {
      setTimeout(() => {
        delete params['delay'];
        self.show(params);
      });
      return;
    }

    if('duration' in params) {
      this._ref.nativeElement.style.display = 'flex';
      this._ref.nativeElement.style.zIndex = this.stageZIndex; // this.stageZIndex;
      setTimeout(() => {
        self.hide();
      }, params.duration);
    }
  }

  public hide(): void {
    this._renderer.setStyle(this._ref.nativeElement, 'display', 'none');
  }
}


@Component({
  selector: 'stage-animation-header',
  template: '<div class="stage-animation-header cover"><ng-content></ng-content></div>',
  styleUrls: ['./stage-animation.component.css']
})
export class StageAnimationHeaderComponent {
}

@Component({
  selector: 'stage-animation-body',
  template: '<div #stageAnimationContainer class=\'flex-item-1-for-medium-down cover\'><div #stageAnimationContent class="stage-animation-content flex-item-1-for-medium-down text-center cover centered"><object #stageAnimationContentObject data="" type="image/svg+xml"></object><ng-content></ng-content></div></div>',
  styleUrls: ['./stage-animation.component.css']
})
export class StageAnimationBodyComponent implements OnInit, AfterViewInit {

  _randomValue: number = Math.random();

  @Input() stageType: string = 'SPOTLIGHT';
  @Input() stageZIndex: string = '25000';
  @Input() lightColor: string = '#eeeeee60';
  @Input() lightShape: string = 'circle';
  @Input() lightPosition: string = 'center center';
  @Input() backgroundColor: string = '#00000050';
  @Input() animationUrl: string = '';
  @Input() animationPosition: string = 'center center';
  @Input() animationInteractive: boolean = false;
  @Input() widthMax: string = '';
  @Input() heightMax: string = '';

  @ViewChild('stageAnimationContainer', { static: false }) _stageAnimationContainer!: ElementRef;
  @ViewChild('stageAnimationContent', { static: false }) _stageAnimationContent!: ElementRef;
  @ViewChild('stageAnimationContentObject', { static: false }) _stageAnimationContentObject!: ElementRef;

  constructor(
    public ref: ElementRef, 
    public renderer: Renderer2 
    ) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._randomValue = Math.random();

    // container; spotlight
    let style = 'top:0;left:0;';
    this.renderer.setAttribute(this._stageAnimationContainer.nativeElement, 'style', style);

    // DEBUG
    // alert(this._stageAnimationContent + '; heightMax:' + this.heightMax);

    if(this.widthMax != '') {
      this._stageAnimationContent.nativeElement.style.maxWidth = this.widthMax;
    }

    if(this.heightMax != '') {
      this._stageAnimationContent.nativeElement.style.maxHeight = this.heightMax;
    }

    // content; animation
    if(this.animationInteractive) {
      this._stageAnimationContentObject.nativeElement.data = this.animationUrl + '?_r=' + this._randomValue;
    }
    else {
      // style='min-width:25rem;max-width:40rem;background-image:url(\'' + this.animationUrl + '?_r=' + this._randomValue + '\');background-position:' + this.animationPosition + ';background-size:150%;background-repeat:no-repeat;';
      // this.renderer.setAttribute(this._stageAnimationContent.nativeElement, 'style', style);
      this._stageAnimationContent.nativeElement.style.backgroundImage = 'url(\'' + this.animationUrl + '?_r=' + this._randomValue + '\');background-position:' + this.animationPosition + ';background-size:150%;background-repeat:no-repeat;'
    }
  }

  public show(params: any = {}): void {
    
  }
}

@Component({
  selector: 'stage-animation-footer',
  template: '<div class="stage-animation-footer flex cover flex-item-1-for-medium-down justify-center align-items-center padding-lr-xlg border-box"><ng-content></ng-content></div>',
  styleUrls: ['./stage-animation.component.css']
})
export class StageAnimationFooterComponent {
}
