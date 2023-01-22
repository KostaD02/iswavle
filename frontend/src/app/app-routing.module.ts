import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultSubjectComponent } from './views';
import { EditorComponent } from './views/editor/editor.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { NotfoundComponent } from './views/notfound/notfound.component';
import { SubjectComponent } from './views/subjects/subject/subject.component';
import { SubjectsComponent } from './views/subjects/subjects.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'editor', component: EditorComponent },
  {
    path: 'subject',
    component: SubjectsComponent,
    children: [
      {
        path:'',
        component: DefaultSubjectComponent
      },
      {
        path: ':subject',
        component: SubjectComponent,
      }
    ]
  },
  { path: '404', component: NotfoundComponent },
  { path: '**', pathMatch: 'full', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
