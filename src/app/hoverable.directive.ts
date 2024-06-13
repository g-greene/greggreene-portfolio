import { Directive, ElementRef, Input, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[hoverable]'
})
export class HoverableDirective {

  @Input() hoverOn: string = '';
  @Input() hoverOff: string = '';

  constructor(el: ElementRef ) {
    console.debug(el);
    el.nativeElement.addEventListener('mouseover', () => {
      // DEBUG
      // alert(this.clickAction);
      // eval(this.hoverOn);
    });
    el.nativeElement.addEventListener('mouseout', () => {
      // DEBUG
      // alert(this.clickAction);
      // eval(this.hoverOff);
    });
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  ngAfterViewInit(): void {

  }

}
