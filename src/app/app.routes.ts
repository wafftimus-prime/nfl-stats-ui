import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { AuthGuard, NoAuthGuard } from './data';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  // Redirect empty path to '/home'
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  // Non Auth Routes
  {
    path: 'login',
    canActivate: [NoAuthGuard],
    component: LoginComponent
  },

  // Auth Routes
  {
    path: '',
    canActivate: [AuthGuard],
    component: MainComponent,
    children: [
      { path: 'home', component: HomeComponent },
    ]
  },

];
