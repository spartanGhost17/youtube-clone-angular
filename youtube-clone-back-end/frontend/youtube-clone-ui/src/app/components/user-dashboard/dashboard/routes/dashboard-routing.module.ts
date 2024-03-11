import { Routes } from "@angular/router";
import { DashboardComponent } from "../dashboard.component";
import { provideState } from "@ngrx/store";
import { dashboardFeatureKey, dashboardReducer } from "../store/reducers";
import { provideEffects } from "@ngrx/effects";
import * as dashboardEffects from "../store/effects";
console.warn("Dashboard was Loaded------------ !!");
export const dashboardRoutes: Routes = [
  {
    path: '', 
    component: DashboardComponent,
    providers: [
      provideState(dashboardFeatureKey, dashboardReducer),
      provideEffects(dashboardEffects), 
    ]
  }
];