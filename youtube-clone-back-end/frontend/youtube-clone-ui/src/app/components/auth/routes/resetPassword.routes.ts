import { Routes } from "@angular/router";
import { ResetPasswordComponent } from "../reset-password/reset-password/reset-password.component";

export const authRoutes: Routes = [
  {
    path: '',
    component: ResetPasswordComponent,
  },
];
