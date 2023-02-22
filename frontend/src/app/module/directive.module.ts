import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlTagDirective } from '../directives';

@NgModule({
  declarations: [
    HtmlTagDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HtmlTagDirective
  ]
})
export class DirectiveModule { }
