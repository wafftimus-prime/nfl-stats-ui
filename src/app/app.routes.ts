import { Routes } from '@angular/router';
import { AuthGuard, NoAuthGuard } from './guards';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
  // Redirect empty path to '/home'
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  {
    path: 'login',
    canActivate: [NoAuthGuard],
    component: LoginComponent
  },

  {
    path: '',
    canActivate: [AuthGuard],
    component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent },
    ]
  },

];
