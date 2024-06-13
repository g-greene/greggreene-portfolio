import { Directive, ElementRef, Input, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[clickable]'
})
export class ClickableDirective {

  @Input() clickAction: string = '';

  onClick(): void {

  }

  constructor(el: ElementRef ) {
    // DEBUG
    // console.debug(el);
    el.nativeElement.addEventListener('click', () => {
      // DEBUG
      // alert(this.clickAction);
      // eval(this.clickAction);
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  ngAfterViewInit(): void {

  }
}
