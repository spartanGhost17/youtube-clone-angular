import { Routes } from "@angular/router";
import { DashboardViewComponent } from "../dashboard-view.component";
console.warn("LOADED STUDIOOOOOOOOOOOOO");
export const studioRoutes: Routes = [
    {
      path: '',
      component: DashboardViewComponent,
      children: [
            { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
            { path: 'dashboard', loadChildren: () => import('../../../components/user-dashboard/dashboard/routes/dashboard-routing.module').then(m => m.dashboardRoutes) },
            { path: 'content', loadChildren: () => import('../../../components/user-dashboard/content/routes/content-routing.module').then(m => m.contentRoutes) },
            { path: 'edit', loadChildren: () => import('../../../components/user-dashboard/customization/routes/edit-routing.module').then(m => m.customizationRoutes) },
            { path: '**', redirectTo: 'dashboard' }
        ]
    }
];