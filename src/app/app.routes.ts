import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { UserViewPage } from './pages/user-view/user-view.page';
import { UserFormPage } from './pages/user-form/user-form.page';
import { P404Page } from './pages/p404/p404.page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomePage },
  { path: 'user/:_id', component: UserViewPage },
  { path: 'newuser', component: UserFormPage },
  { path: 'updateuser/:_id', component: UserFormPage },

  { path: '**', component: P404Page }
];
