import { NgModule } from '@angular/core';
import { CommonModuleModule } from './common-module.module';

import {
  HeaderComponent,
  FooterComponent,
  CodeeditorComponent,
  ExampleCodeComponent,
  ExternalSourceComponent,
  SubjectCardComponent,
  ErrorOutputComponent,
  ScrollupComponent,
  LoaderComponent,
  ChipComponent
} from '.././shared';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CodeeditorComponent,
    ExampleCodeComponent,
    ExternalSourceComponent,
    SubjectCardComponent,
    ErrorOutputComponent,
    ScrollupComponent,
    LoaderComponent,
    ChipComponent
  ],
  imports: [
    CommonModuleModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CodeeditorComponent,
    ExampleCodeComponent,
    ExternalSourceComponent,
    SubjectCardComponent,
    ErrorOutputComponent,
    ScrollupComponent,
    LoaderComponent,
    ChipComponent
  ]
})
export class SharedModule { }
