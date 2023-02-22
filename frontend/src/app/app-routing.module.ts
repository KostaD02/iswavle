import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KEYWORDS } from './constants';
import { SubjectGuard } from './guards';
import { CreateSubjectComponent, DefaultSubjectComponent, TasksComponent } from './views';
import { EditorComponent } from './views/editor/editor.component';
import { HomepageComponent } from './views/homepage/homepage.component';
import { NotfoundComponent } from './views/notfound/notfound.component';
import { SubjectComponent } from './views/subjects/subject/subject.component';
import { SubjectsComponent } from './views/subjects/subjects.component';

const imageSource = "https://raw.githubusercontent.com/KostaD02/iswavle/main/frontend/src/assets/images/meta_image.png";

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
          title: "თემები",
          seo: {
            title: 'Iswavle | ცნობარი ქართულად'
          }
        }
      }
    ],
    data: {
      title: "თემები",
      seo: {
        title: 'Iswavle | ცნობარი ქართულად',
        metaTags: [
          { name: 'description', content: 'ცნობარი ქართულად HTML/CSS/JS' },
          { name: 'keywords', content: KEYWORDS.join() },
          { name: 'twitter:card', content: imageSource },
          { property: 'og:title', content: 'ცნობარი ქართლად HTML CSS JS' },
          { property: 'og:description', content: 'შეისწავლე შენი ტემპით' },
          { property: 'og:image', content: imageSource }
        ]
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
        metaTags: [
          { name: 'description', content: 'დავალებები HTML/CSS/JS' },
          { name: 'keywords', content: KEYWORDS.join() },
          { name: 'twitter:card', content: imageSource },
          { property: 'og:title', content: 'დავალებები ქართლად HTML CSS JS' },
          { property: 'og:description', content: 'შეასრულე ფრონტ-ენდის დავალებები' },
          { property: 'og:image', content: imageSource }
        ]
      }
    },
  },
  {
    path: 'create-subject',
    component: CreateSubjectComponent,
    canActivate: [SubjectGuard],
    data: {
      title: "შექმენი თემა",
      seo: {
        title: 'Iswavle | შექმენი თემა',
        metaTags: [
          { name: "robots", content: "noindex" }
        ]
      }
    }
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
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
