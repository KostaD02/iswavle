import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scrollup',
  templateUrl: './scrollup.component.html',
  styleUrls: ['./scrollup.component.scss'],
})
export class ScrollupComponent {

  @Input() showScroll: boolean = false;
  @Input() container: HTMLElement = document.documentElement;

  public gotoTop() {
    this.container.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
