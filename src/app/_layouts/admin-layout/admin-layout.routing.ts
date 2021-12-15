import { Routes } from '@angular/router';

import { DashboardComponent } from '@views/dashboard/dashboard.component';
// sample
import { UserProfileComponent } from '@views/user-profile/user-profile.component';
import { TableListComponent } from '@views/table-list/table-list.component';
import { TypographyComponent } from '@views/typography/typography.component';
import { IconsComponent } from '@views/icons/icons.component';
import { MapsComponent } from '@views/maps/maps.component';
import { NotificationsComponent } from '@views/notifications/notifications.component';
import { UpgradeComponent } from '@views/upgrade/upgrade.component';
import { TodoTodayComponent } from '@app/views/todo-today/todo-today.component';
import { CreateUserComponent } from '@app/views/auth/create-user/create-user.component';
import { MoneyComponent } from '@app/views/money/money.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard', component: DashboardComponent },
    { path: 'create-user', component: CreateUserComponent },
    { path: 'todo-today', component: TodoTodayComponent },
    { path: 'money', component: MoneyComponent },

    //----- sample components
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'table-list', component: TableListComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent },
];
