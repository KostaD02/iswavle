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
  TableComponent
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
    TableComponent
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
    TableComponent
  ]
})
export class SharedModule { }
