import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-example-code',
  templateUrl: './example-code.component.html',
  styleUrls: ['./example-code.component.scss']
})
export class ExampleCodeComponent {
  @Input() code: string = '';
  @Input() language: string = '';
  public extraKeys = {};
}
