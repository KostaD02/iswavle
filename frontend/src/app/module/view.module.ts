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
  CreateCodeExampleComponent
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
    CreateSubjectComponent,
    CreateCodeExampleComponent
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
    CreateSubjectComponent,
    CreateCodeExampleComponent
  ]
})
export class ViewModule { }
