import { Component, OnInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'badge-saving',
  templateUrl: './badge-saving.component.html',
  styleUrls: ['./badge-saving.component.css']
})
export class BadgeSavingComponent implements OnInit {

  constructor(public ref: ElementRef, public renderer: Renderer2 ) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.renderer.setAttribute(this.ref.nativeElement, 'class', 'badge-saving notifier-badge absolute absolute-bottom-right absolute-center-for-medium-down anim-size-pulse run no-shadow no-margin');
    this.renderer.setAttribute(this.ref.nativeElement, 'style', 'top:unset;left:unset;width:15%;height:15%;max-width:10rem;max-height:10rem;min-width:10rem;min-height:10rem;aspect-ratio:1;opacity:0.8;--absolute-center-left-offset:5rem;');
  }

  public show(): void {
    this.renderer.setStyle(this.ref.nativeElement, 'display', 'block');
  }

  public hide(): void {
    this.renderer.setStyle(this.ref.nativeElement, 'display', 'none');
  }
}
