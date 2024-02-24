import { Routes } from "@angular/router";
import { DashboardViewComponent } from "../../pages/dashboard-view/dashboard-view.component";
console.warn("LOADED STUDIOOOOOOOOOOOOO");
export const studioRoutes: Routes = [
    {
      path: '',
      component: DashboardViewComponent,
      children: [
            { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
            { path: 'dashboard', loadChildren: () => import('./children/dashboard-routing.module').then(m => m.dashboardRoutes) },
            { path: 'content', loadChildren: () => import('./children/content-routing.module').then(m => m.contentRoutes) },
            { path: 'edit', loadChildren: () => import('./children/edit-routing.module').then(m => m.customizationRoutes) },
            { path: '**', redirectTo: 'dashboard' }
        ]
    }
];