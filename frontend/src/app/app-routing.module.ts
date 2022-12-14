import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './views/homepage/homepage.component';
import { NotfoundComponent } from './views/notfound/notfound.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },

  { path: '404', component: NotfoundComponent },
  { path: '**', pathMatch: 'full', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
