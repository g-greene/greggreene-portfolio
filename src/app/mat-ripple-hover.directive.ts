import { Directive, ElementRef, Renderer2, HostListener, Input, Output, EventEmitter } from '@angular/core'
import { MatRipple } from '@angular/material/core';

@Directive({
  selector: '[matRippleHover]',
  providers: [MatRipple]})
  export class MatRippleHoverDirective {
  rippleRef:any;
  constructor(
      private _elementRef: ElementRef,
      private ripple: MatRipple
  ) {}

  @Input()
  matRippleHoverBlendMode: string = 'color-burn';

  @Input()
  matRippleHoverColor: string = '#0000001a';

  @HostListener('mouseenter')
  onMouseEnter(): void {
      if (this._elementRef && this._elementRef.nativeElement) {
          this._elementRef.nativeElement.style.overflow = 'hidden';
      }

      if (this.ripple) {
          this.rippleRef = this.ripple.launch({ centered: true, persistent: true });
          this.rippleRef.element.style.mixBlendMode = this.matRippleHoverBlendMode;
          this.rippleRef.element.style.backgroundColor = this.matRippleHoverColor;
      }
  }
  @HostListener('mouseleave')
  onMouseLeave(): void {
      if (this.rippleRef) {
          this.rippleRef.fadeOut();
      }
  }}
