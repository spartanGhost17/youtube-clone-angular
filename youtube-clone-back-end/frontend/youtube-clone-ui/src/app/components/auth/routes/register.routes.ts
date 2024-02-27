import { Routes } from '@angular/router';
import { RegisterComponent } from '../components/register/register.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: RegisterComponent,
  }
];
