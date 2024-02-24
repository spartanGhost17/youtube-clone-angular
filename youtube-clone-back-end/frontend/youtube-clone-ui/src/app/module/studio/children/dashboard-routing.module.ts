import { Routes } from "@angular/router";
import { DashboardComponent } from "../../../components/user-dashboard/dashboard/dashboard.component";
console.warn("Dashboard was Loaded------------ !!");
export const dashboardRoutes: Routes = [
  {
    path: '', 
    component: DashboardComponent,
  }
];