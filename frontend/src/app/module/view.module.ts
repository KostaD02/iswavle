import { NgModule } from '@angular/core';

import {
  HomepageComponent,
  NotfoundComponent,
  EditorComponent,
  DefaultSubjectComponent,
  SubjectComponent,
  SubjectsComponent,
  TasksComponent,
  CreateSubjectComponent,
} from '../views';

import { CommonModuleModule } from './common-module.module';
import { PipeModule } from './pipe.module';
import { SharedModule } from './shared.module';

@NgModule({
  declarations: [
    HomepageComponent,
    NotfoundComponent,
    EditorComponent,
    SubjectsComponent,
    SubjectComponent,
    DefaultSubjectComponent,
    TasksComponent,
    CreateSubjectComponent
  ],
  imports: [
    CommonModuleModule,
    SharedModule,
    PipeModule
  ],
  exports: [
    HomepageComponent,
    NotfoundComponent,
    EditorComponent,
    SubjectsComponent,
    SubjectComponent,
    DefaultSubjectComponent,
    TasksComponent,
    CreateSubjectComponent
  ]
})
export class ViewModule { }
