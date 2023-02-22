import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  CapitalizePipe,
  HtmlTagPipe,
  NoSanitizePipe,
  SubjectFormatter
} from '.././pipes';

@NgModule({
  declarations: [
    CapitalizePipe,
    HtmlTagPipe,
    NoSanitizePipe,
    SubjectFormatter
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CapitalizePipe,
    HtmlTagPipe,
    NoSanitizePipe,
    SubjectFormatter
  ]
})
export class PipeModule { }
