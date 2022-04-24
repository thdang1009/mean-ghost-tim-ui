import { Routes } from '@angular/router';

import { DashboardComponent } from '@views/dashboard/dashboard.component';
import { AdminGuard } from '@app/views/auth-management/auth/admin.guard';
import { GrandAdminGuard } from '@app/views/auth-management/auth/grand-admin.guard';
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
    {
        path: 'user-management',
        children: [{
            path: '',
            loadChildren: () => import('../../views/user-management/user-management.module').then(m =>  m.UserManagementModule ),
            canActivate: [GrandAdminGuard]
        }]
    },
    {
        path: 'blog-management',
        children: [{
            path: '',
            loadChildren: () => import('../../views/blog-management/blog-management.module').then(m => m.BlogManagementModule ),
            canActivate: [GrandAdminGuard]
        }]
    },
    {
        path: 'tool',
        children: [{
            path: '',
            loadChildren: () => import('../../views/ghost-management/ghost-management.module').then(m => m.GhostManagementModule ),
            canActivate: [GrandAdminGuard]
        }]
    }

    //----- sample components
    // { path: 'user-profile', component: UserProfileComponent },
    // { path: 'table-list', component: TableListComponent },
    // { path: 'typography', component: TypographyComponent },
    // { path: 'icons', component: IconsComponent },
    // { path: 'maps', component: MapsComponent },
    // { path: 'notifications', component: NotificationsComponent },
    // { path: 'upgrade', component: UpgradeComponent },
];
