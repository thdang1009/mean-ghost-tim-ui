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
import { CreateUserComponent } from '@app/views/create-user/create-user.component';
import { MoneyComponent } from '@app/views/money/money.component';
import { AdminGuard } from '@app/views/auth/admin.guard';
import { GrandAdminGuard } from '@app/views/auth/grand-admin.guard';
import { LoginGuard } from '@app/views/auth/login.guard';
import { ListUserComponent } from '@app/views/list-user/list-user.component';
import { NoteComponent } from '@app/views/note/note.component';
import { FoodComponent } from '@app/views/food/food.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [AdminGuard] },
    { path: 'create-user', component: CreateUserComponent, canActivate: [GrandAdminGuard] },
    { path: 'list-user', component: ListUserComponent, canActivate: [GrandAdminGuard] },
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
