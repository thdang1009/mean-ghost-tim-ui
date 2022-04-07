import { Routes } from '@angular/router';

import { DashboardComponent } from '@views/dashboard/dashboard.component';
import { TodoTodayComponent } from '@app/views/ghost-management/todo-today/todo-today.component';
import { MoneyComponent } from '@app/views/ghost-management/money/money.component';
import { AdminGuard } from '@app/views/auth-management/auth/admin.guard';
import { GrandAdminGuard } from '@app/views/auth-management/auth/grand-admin.guard';
import { LoginGuard } from '@app/views/auth-management/auth/login.guard';
import { NoteComponent } from '@app/views/ghost-management/note/note.component';
import { FoodComponent } from '@app/views/ghost-management/food/food.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
    {
        path: 'user-management',
        children: [{
            path: '',
            loadChildren: () => import('../../views/user-management/user-management.module').then(m => { return m.UserManagementModule }),
            canActivate: [GrandAdminGuard]
        }]
    },
    // { path: 'add-user', component: AddUserComponent, canActivate: [GrandAdminGuard] },
    // { path: 'user-list', component: UserListComponent, canActivate: [GrandAdminGuard] },
    { path: 'todo-today', component: TodoTodayComponent, canActivate: [LoginGuard] },
    { path: 'note', component: NoteComponent, canActivate: [LoginGuard] },
    { path: 'money', component: MoneyComponent, canActivate: [GrandAdminGuard] },
    { path: 'food', component: FoodComponent, canActivate: [LoginGuard] },

    //----- sample components
    // { path: 'user-profile', component: UserProfileComponent },
    // { path: 'table-list', component: TableListComponent },
    // { path: 'typography', component: TypographyComponent },
    // { path: 'icons', component: IconsComponent },
    // { path: 'maps', component: MapsComponent },
    // { path: 'notifications', component: NotificationsComponent },
    // { path: 'upgrade', component: UpgradeComponent },
];
