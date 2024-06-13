import { Directive, ElementRef, Renderer2, Input, Output, HostListener, EventEmitter, OnInit } from '@angular/core'
import { TimeoutInfo } from 'rxjs';

@Directive({
  selector: '[autoTrigger]'
})
export class AutoTriggerDirective implements OnInit {

  lastTimeout: any;

  @Input() autoTriggerDelay: number = 2000;
  @Input() autoTriggerColor: string = '#45df5a';
  @Input() autoTriggerAnimate: boolean = true;
  @Input() autoTriggerOn: string[] = [];
  @Output() autoTriggerCall: EventEmitter<any> = new EventEmitter<any>(); //() => void = () => {};

  _action: Function = () => {};

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    var _ = this;

    this._action = (event: any) => {
      _.autoTriggerCall.emit(event);

      if(_.autoTriggerAnimate != true) {
        return;
      }

      let style: string = _.elementRef.nativeElement.getAttribute('style');

      if(!style) {
        return;
      }

      if(style.indexOf('--background-color-start:') < 0) {
        style += '--background-color-start:' + _.autoTriggerColor + ';';
        style += '--background-color-end:' + '#fff' + ';';
        _.elementRef.nativeElement.setAttribute('style', style);
      }

      // this.renderer.setAttribute(this.elementRef.nativeElement,'style', '--background-color-start:' + this.autoTriggerColor + ';' + this.renderer.getAttribute(this.elementRef.nativeElement));
      _.renderer.addClass(_.elementRef.nativeElement, 'anim-background-color-to-color');
      _.renderer.addClass(_.elementRef.nativeElement, 'run');

      setTimeout(() => {
        _.renderer.removeClass(_.elementRef.nativeElement, 'anim-background-color-to-color');
        _.renderer.removeClass(_.elementRef.nativeElement, 'run');
      }, 2000);
    };
  }

  @HostListener('keydown', ['$event'])
    onKeyDown(event: any) {
      console.debug(event);
      for(let i: number = 0; i < this.autoTriggerOn.length; i++) {
        if(event.keyCode == this.autoTriggerOn[i].charCodeAt(0)) {
          clearTimeout(this.lastTimeout);
          this._action(event);
          event.preventDefault();
          return;
        }
      }
    }

  @HostListener('input', ['$event'])
    onInput(event: any) {
      // console.debug(event);
      // alert(event.inputType);

      this.trigger(event);
    }
  
  @HostListener('change', ['$event'])
    onChange(event: any) {
      this.trigger(event);
    }

    trigger(event: any) {
      clearTimeout(this.lastTimeout);
      this.lastTimeout = setTimeout(() => {
        this._action(event);
      }, this.autoTriggerDelay);
    }
}



