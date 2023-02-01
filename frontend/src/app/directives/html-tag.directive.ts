import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHtmlTag]'
})
export class HtmlTagDirective {
  readonly color = '#FF5370';

  constructor(private element: ElementRef, private renderer:Renderer2) {
    this.setColor();
  }

  private setColor(){
    this.renderer.setStyle(this.element.nativeElement, 'color', this.color);
  }
}
