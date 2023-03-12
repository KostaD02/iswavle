import { NgModule } from '@angular/core';
import { CommonModuleModule } from './common-module.module';

import {
  HeaderComponent,
  FooterComponent,
  CodeeditorComponent,
  ExampleCodeComponent,
  SubjectCardComponent,
  ErrorOutputComponent,
  ScrollupComponent,
  LoaderComponent,
  ChipComponent,
  TableComponent,
  FacebookCommentComponent
} from '.././shared';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CodeeditorComponent,
    ExampleCodeComponent,
    SubjectCardComponent,
    ErrorOutputComponent,
    ScrollupComponent,
    LoaderComponent,
    ChipComponent,
    TableComponent,
    FacebookCommentComponent
  ],
  imports: [
    CommonModuleModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CodeeditorComponent,
    ExampleCodeComponent,
    SubjectCardComponent,
    ErrorOutputComponent,
    ScrollupComponent,
    LoaderComponent,
    ChipComponent,
    TableComponent,
    FacebookCommentComponent
  ]
})
export class SharedModule { }
