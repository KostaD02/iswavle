import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KEYWORDS } from './constants';
import { DefaultSubjectComponent, TasksComponent } from './views';
import { EditorComponent } from './views/editor/editor.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { NotfoundComponent } from './views/notfound/notfound.component';
import { SubjectComponent } from './views/subjects/subject/subject.component';
import { SubjectsComponent } from './views/subjects/subjects.component';

const imageSource = "../assets/images/meta_image.png";

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    data: {
      title: "",
      seo: {
        title: 'Iswavle | ისწავლე ფრონტ ენდი',
        metaTags: [
          { name: 'description', content: 'დოკუმენტაცია ქართულად, დავალებები ქართულად, ონლაინ ედითორი' },
          { name: 'twitter:card', content: imageSource },
          { name: 'keywords', content: KEYWORDS.join() },
          { property: 'og:title', content: 'შეისწავლე ფრონტენდი საკუთარი ტემპით' },
          { property: 'og:description', content: 'დოკუმენტაცია ქართულად, დავალებები ქართულად, ონლაინ ედითორი' },
          { property: 'og:image', content: imageSource }
        ]
      }
    },
  },
  {
    path: 'editor',
    component: EditorComponent,
    data: {
      title: "ედითორი",
      seo: {
        title: 'Iswavle | ონლაინ ედითორი',
        metaTags: [
          { name: 'description', content: 'ონლაინ ედითორი HTML/CSS/JS' },
          { name: 'keywords', content: KEYWORDS.join() },
          { name: 'twitter:card', content: imageSource },
          { property: 'og:title', content: 'ონლაინ ედითორი HTML CSS JS' },
          { property: 'og:description', content: 'ონლაინ ედითორი ვებისთვის' },
          { property: 'og:image', content: imageSource }
        ]
      }
    },
    children: [
      {
        path: ':id',
        component: EditorComponent,
        data: {
          loadCode: true
        }
      }
    ]
  },
  {
    path: 'subject',
    component: SubjectsComponent,
    children: [
      {
        path: '',
        component: DefaultSubjectComponent
      },
      {
        path: ':subject',
        component: SubjectComponent,
        data: {
          title: "თემები"
        }
      }
    ],
    data: {
      title: "თემები",
      seo: {
        title: 'Iswavle | ცნობარი ქართულად',
      }
    },
  },
  {
    path: 'tasks',
    component: TasksComponent,
    data: {
      title: "დავალებები",
      seo: {
        title: 'Iswavle | დავალებები ქართულად',
      }
    },
  },
  {
    path: '404',
    component: NotfoundComponent,
    data: {
      title: "გვერდი ვერ მოიძებნა",
      seo: {
        title: 'Iswavle | 404',
        metaTags: [
          { name: "robots", content: "noindex" }
        ]
      }
    },
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
