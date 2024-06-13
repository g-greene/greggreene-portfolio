import { ViewEncapsulation, ViewChild, ViewChildren, ViewRef, ViewContainerRef, ContentChildren, Renderer2} from '@angular/core';
import { Component, OnInit, OnDestroy, ElementRef, TemplateRef, Input, Output, EventEmitter, AfterContentInit, AfterViewInit } from '@angular/core';
import { ChildrenOutletContexts, ActivatedRoute, ActivationStart, Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { first, filter, takeUntil } from 'rxjs/operators';
import { Observable, ObservableInput } from 'rxjs';

import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';

import { PanelService } from './panel.service';
import { PanelItem } from './panel-item';

import { AppStateInfo } from './app-state-info';

import { StageAnimationComponent, StageAnimationFooterComponent } from './stage-animation/stage-animation.component';
import { BaseService } from './base.service';
import { EventHubService } from './event-hub.service';

import { DialogGenericComponent, DialogInstance } from './dialog-generic/dialog-generic.component';

import { environment } from '../environments/environment';

import { Util, Device } from './Util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  panels: PanelItem[] = [];
  panelsMini: PanelItem[] = [];

  _appStateInfo: AppStateInfo;
  _appStates: any = {};
  _splashLoadProgressValue: string = '0%';
  title = 'Greg Greene';

  _contentTypes: any[] = [
    {code: 'web', name: 'web', iconCssClass: 'fa-globe', appModeCssClass: 'app-mode--content-web', next: null },
    {code: 'image', name: 'image', iconCssClass: 'fa-image', appModeCssClass: 'app-mode--content-image', next: null},
    {code: 'photo', name: 'photo', iconCssClass: 'fa-camera', appModeCssClass: 'app-mode--content-photo', next: null},
  ]

  _activeContentType: any = null;

  @ViewChild('notifierBadge', {static: false}) notifierBadge!: ElementRef;
  @ViewChild('notifierBadgeContent', {static: false}) notifierBadgeContent!: ElementRef;
  @ViewChild('notifierBadgeIcon', {static: false}) notifierBadgeIcon!: ElementRef;

  @ViewChild('flyoutContentNext', {static: false}) flyoutContentNext!: ElementRef;
  @ViewChild('flyoutContentNextIcon', {static: false}) flyoutContentNextIcon!: ElementRef;
  @ViewChild('flyoutContentSwapButton', {static: false}) flyoutContentSwapButton!: ElementRef;

  @ViewChild('notifierFeatureContact', {static: false}) notifierFeatureContact!: ElementRef;
  @ViewChild('notifierFeatureResume', {static: false}) notifierFeatureResume!: ElementRef;
  @ViewChild(MatProgressBar, {static: false}) splashProgressBar!: MatProgressBar;

  @ViewChild(StageAnimationComponent, {static: true}) stageAnimation!: StageAnimationComponent;

  @ViewChild('animationClickContent', {static: false}) animationClickContent!: ElementRef;
  @ViewChild('animationClickContentObject', {static: false}) animationClickContentObject!: ElementRef;

  constructor (
    private _ref: ElementRef,
    private _contexts: ChildrenOutletContexts,
    private _router: Router,
    private _route: ActivatedRoute,
    private PanelService: PanelService,
    private _renderer: Renderer2
    ) {
      var self = this;
      EventHubService.getInstance().init();
      this._appStateInfo = new AppStateInfo(environment.storageId);

      // create linked list
      for(let i: number = 0; i < this._contentTypes.length; i++) {
        if(i + 1 < this._contentTypes.length) {
          this._contentTypes[i].next = this._contentTypes[i + 1];
        }
        else {
          this._contentTypes[i].next = this._contentTypes[0]
        }
      }

      // DEBUG
      // console.debug(this._contentTypes);

      EventHubService.getInstance().contentTypeChanged$.subscribe(typeCode => {
        this._appStates['contentType'] = this.ActiveContentType;

        this._renderer.addClass(this.animationClickContent.nativeElement, 'hide');

        let badge = this._appStateInfo.content['notifierBadge'],
              badge_icon = this._appStateInfo.content['notifierBadgeIcon'],
              flyout_next = this._appStateInfo.content['flyoutNext'],
              flyout_next_icon = this._appStateInfo.content['flyoutNextIcon'],
              flyout_swap_button = this._appStateInfo.content['flyoutSwapButton'];

          this._renderer.removeClass(badge.nativeElement, 'run');
          badge.nativeElement.style.display = 'inline-block';

          this._renderer.removeClass(badge_icon.nativeElement, 'fa-camera');
          this._renderer.removeClass(badge_icon.nativeElement, 'fa-image');
          this._renderer.removeClass(badge_icon.nativeElement, 'fa-globe');

          this._renderer.removeClass(flyout_next_icon.nativeElement, 'fa-camera');
          this._renderer.removeClass(flyout_next_icon.nativeElement, 'fa-image');
          this._renderer.removeClass(flyout_next_icon.nativeElement, 'fa-globe');

          this._renderer.removeClass(flyout_swap_button.nativeElement, 'fa-camera');
          this._renderer.removeClass(flyout_swap_button.nativeElement, 'fa-image');
          this._renderer.removeClass(flyout_swap_button.nativeElement, 'fa-globe');

          this._renderer.addClass(badge_icon.nativeElement, this.ActiveContentType.iconCssClass);

          // to allow for CSS related hooks
          this._renderer.addClass(document.body, this.ActiveContentType.appModeCssClass);

          this._renderer.addClass(flyout_next_icon.nativeElement, this.ActiveContentType.next.iconCssClass);
          this._renderer.addClass(flyout_swap_button.nativeElement, this.ActiveContentType.iconCssClass);

          this._renderer.addClass(badge.nativeElement, 'run');

          setTimeout(() => {
            badge.nativeElement.style.display = 'none';
            this._renderer.removeClass(badge.nativeElement, 'run');
          }, 700)

        this.onMouseOverFlyoutContent();

        setTimeout(() => {
          this.onMouseLeaveFlyoutContent();
        }, 700)


        this._renderer.removeClass(document.body, 'mode--menu-radial');

        if(typeof typeCode != 'undefined') {
          if(typeCode == 'web') {
            this._renderer.addClass(document.body, 'app-mode--content-web');
            this._renderer.removeClass(document.body, 'app-mode--content-image');
            this._renderer.removeClass(document.body, 'app-mode--content-photo');
          }
          else if(typeCode == 'image') {
            this._renderer.addClass(document.body, 'app-mode--content-image');
            this._renderer.removeClass(document.body, 'app-mode--content-web');
            this._renderer.removeClass(document.body, 'app-mode--content-photo');
          }
          else if(typeCode == 'photo') {
            this._renderer.addClass(document.body, 'app-mode--content-photo');
            this._renderer.removeClass(document.body, 'app-mode--content-web');
            this._renderer.removeClass(document.body, 'app-mode--content-image');
          }
        }

        EventHubService.getInstance().emitReloadContent(typeCode);
      });

      // this._appStates = this._appStateInfo.states || {};
      this._appStates['usePageTransitions'] = true;

      _router.events.pipe().subscribe(event => {
        if(event instanceof ActivationStart) {
          // DEBUG
          // console.log('router events:');
          // console.log(event);

          // this._appStateInfo.msalAccount = this.msalService.instance.getActiveAccount();

          // console.debug('activeAccount (app.component: router.event)');
          // console.debug(this.msalService.instance.getActiveAccount());

          var data = event.snapshot.data,
              path = '',
              changed = false,
              outlet = null,
              config = null,
              origins = ['start', 'knowledge'];

          // DEBUG
          // alert(event.snapshot.url[0].path);

          if(origins.indexOf(event.snapshot.url[0].path) > -1) {
            this.ActiveStorage['breadcrumb-origin'] = '/' + event.snapshot.url[0].path;
          }

          // this.viewTemplateName = data['viewTemplate'];

          this._appStates['usePageTransitions'] = (!('usePageTransitions' in data)) ? true : data['usePageTransitions'];

          // if(this.viewTemplateName == 'template_landing') {
          //   this.viewTemplate = this.template_landing;
          //   this.currentRouterOutlet = this.router_landing;
          // }
          // else if(this.viewTemplateName == 'template_interior') {
          //   this.viewTemplate = this.template_interior;
          //   this.currentRouterOutlet = this.router_interior;

          //   // DEBUG
          //   // console.debug('template_interior router:');
          //   // console.debug(this.currentRouterOutlet);
          // }
          // else if(this.viewTemplateName == 'template_admin_interior') {
          //   this.viewTemplate = this.template_admin_interior;
          //   this.currentRouterOutlet = this.router_admin_interior;
          // }

          // outlet = this.currentRouterOutlet;

          // if(outlet) {
          //   if (outlet.isActivated) {
          //     config = outlet.activatedRoute.routeConfig;
          //     path = config.path || '';
          //   }
          // }

          // if(this.body_interior && this._appStates['usePageTransitions'] == true) {
          //   this.renderer.addClass(this.body_interior.nativeElement, 'run');
      
          //   setTimeout(() => {
          //     if(this.body_interior && this.body_interior.nativeElement) {
          //       this.renderer.removeClass(this.body_interior.nativeElement, 'run');
          //     }
          //   }, 250);
          // }
        }
      });
    }

  

  ngOnInit(): void {
    this.panels = this.PanelService.getPanels();
    this.panelsMini = this.PanelService.getPanelsMini();

    document.body.style.background = 'linear-gradient(102deg, #a6d7ff77 0%, #a6d7ff77 50%, #a6d7ffbb 50%, #a6d7ffbb 100%) no-repeat';
    this._renderer.addClass(document.body, 'app-mode--content-web');
  }

  public get ActiveStorage(): any {
    return this._appStateInfo.Instance.Storage;
  }

  ngAfterViewInit(): void {

    this._appStateInfo.content['notifierBadge'] = this.notifierBadge;
    this._appStateInfo.content['notifierBadgeIcon'] = this.notifierBadgeIcon;
    this._appStateInfo.content['notifierBadgeContent'] = this.notifierBadgeContent;

    this._appStateInfo.content['flyoutNext'] = this.flyoutContentNext;
    this._appStateInfo.content['flyoutNextIcon'] = this.flyoutContentNextIcon;
    this._appStateInfo.content['flyoutSwapButton'] = this.flyoutContentSwapButton;

    this.ActiveContentType = this._contentTypes[0];

    var self = this;
    this.stageAnimation.show({ duration: 10000 });
    this.splashProgressBar.color = 'accent';

    this.splashProgressBar.animationEnd.subscribe(r => {
      setTimeout(() => {
        self.stageAnimation.hide();
      }, 1500);
    });

    setTimeout(()=> {
      // alert(this.splashProgressBar);
      for(let i: number = 5; i <= 100; i+=5) {
        var delay: number = i * 30;
        setTimeout(() => {
          self._splashLoadProgressValue = i + '%';
          self.splashProgressBar.value = i;
        }, delay);
      }
    }, 250);
  }

  ngOnDestroy(): void {
  }


  get ActiveContentType(): any {
    return this._activeContentType;
  }

  set ActiveContentType(value: any) {
    this._activeContentType = value;
    EventHubService.getInstance().emitContentTypeChanged(this._activeContentType.code);
  }

  findContentType(typeCode: string): any {
    for(let i: number = 0; i < this._contentTypes.length; i++) {
      if(this._contentTypes[i].code == typeCode) {
        return this._contentTypes[i];
      }
    }

    return null;
  }

  findNextContentType(typeCode: string): any {
    for(let i: number = 0; i < this._contentTypes.length; i++) {
      if(this._contentTypes[i].code == typeCode) {
        if(i + 1 < this._contentTypes.length) {
          return this._contentTypes[i + 1];
        }
        else {
          return this._contentTypes[0]
        }
      }
    }

    return null;
  }

  onClickModalOverlay(): void {
    this._renderer.removeClass(document.body, 'mode--modal');
    this._renderer.removeClass(document.body, 'mode--menu-radial');

    EventHubService.getInstance().emitClosePanels(null);

    this._renderer.removeClass(this.notifierFeatureContact.nativeElement, 'show');
    this._renderer.removeClass(this.notifierFeatureContact.nativeElement, 'run');
    this._renderer.removeClass(this.notifierFeatureResume.nativeElement, 'show');
    this._renderer.removeClass(this.notifierFeatureResume.nativeElement, 'run');
    this._renderer.addClass(this.animationClickContent.nativeElement, 'hide');
  }

  onClickAnimationOverlay(): void {
    this._renderer.removeClass(document.body, 'mode--modal');
    this._renderer.removeClass(document.body, 'mode--menu-radial');

    EventHubService.getInstance().emitClosePanels(null);

    this._renderer.removeClass(this.notifierFeatureContact.nativeElement, 'show');
    this._renderer.removeClass(this.notifierFeatureContact.nativeElement, 'run');
    this._renderer.removeClass(this.notifierFeatureResume.nativeElement, 'show');
    this._renderer.removeClass(this.notifierFeatureResume.nativeElement, 'run');
    this._renderer.addClass(this.animationClickContent.nativeElement, 'hide');
  }

  onClickContact(): void {
    this._renderer.addClass(document.body, 'mode--modal');
    this._renderer.addClass(this.notifierFeatureContact.nativeElement, 'show');
    this._renderer.addClass(this.notifierFeatureContact.nativeElement, 'run');
    this._renderer.addClass(this.animationClickContent.nativeElement, 'hide');
  };

  onClickResume(): void {
    this._renderer.addClass(document.body, 'mode--modal');
    this._renderer.addClass(this.notifierFeatureResume.nativeElement, 'show');
    this._renderer.addClass(this.notifierFeatureResume.nativeElement, 'run');
    this._renderer.addClass(this.animationClickContent.nativeElement, 'hide');
  };

  onClickRadialMenu(): void {
    this._renderer.addClass(document.body, 'mode--menu-radial');

    setTimeout(() => {
      this._renderer.removeClass(this.animationClickContent.nativeElement, 'hide');

      if(Device.isMobile()) {
        this.animationClickContentObject.nativeElement.style = 'min-height:20rem;max-height:20rem;';
      }
      else {
        this.animationClickContentObject.nativeElement.style = 'min-height:35rem;max-height:40rem;';
      }

      if(!('animationClickContentDataUrl' in this._appStates)) {
        this._appStates['animationClickContentDataUrl'] = this.animationClickContentObject.nativeElement.data;
      }
      this.animationClickContentObject.nativeElement.data = (this._appStates['animationClickContentDataUrl'] + '?_r=' + Math.random());
    }, 250);
  }

  onClickRadialMenuButton(event: any): void {
    this.ActiveContentType = this.findContentType(event.contentType);
  }

  onClickChangeContent(): void {
    this.ActiveContentType = this._activeContentType.next;

    // EventHubService.getInstance().emitContentTypeChanged(this._activeContentType.next.code);
  }

  onMouseOverFlyoutContent(): void {
    this._renderer.addClass(this.flyoutContentNext.nativeElement, 'clicked');
  }

  onMouseLeaveFlyoutContent(): void {
    this._renderer.removeClass(this.flyoutContentNext.nativeElement, 'clicked');
  }
}
