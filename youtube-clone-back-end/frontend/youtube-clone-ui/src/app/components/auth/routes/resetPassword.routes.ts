import { Routes } from "@angular/router";
import { ResetPasswordComponent } from "../components/reset-password/reset-password.component";

export const authRoutes: Routes = [
  {
    path: '',
    component: ResetPasswordComponent,
  },
];
