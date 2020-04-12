import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlltailorComponent } from './alltailor/alltailor.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AddtailorComponent } from './addtailor/addtailor.component';
import { TailordetailComponent } from './tailordetail/tailordetail.component';
import { NotFoundComponent } from './pageNotFound/not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'tailors',
    component: AlltailorComponent,
  },
  {
    path: 'tailor-detail/:id',
    component: TailordetailComponent
  },
  {
    path: 'aboutus',
    component: AboutusComponent
  },
  {
    path: 'add-tailor',
    component: AddtailorComponent
  },
  {
    path: 'tailor-detail',
    component: TailordetailComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//export const routingComponents = [AppComponent, AlltailorComponent]