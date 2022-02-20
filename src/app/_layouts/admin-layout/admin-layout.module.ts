import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '@views/dashboard/dashboard.component';
import { UserProfileComponent } from '@views/user-profile/user-profile.component';
import { TableListComponent } from '@views/table-list/table-list.component';
import { TypographyComponent } from '@views/typography/typography.component';
import { IconsComponent } from '@views/icons/icons.component';
import { MapsComponent } from '@views/maps/maps.component';
import { NotificationsComponent } from '@views/notifications/notifications.component';
import { UpgradeComponent } from '@views/upgrade/upgrade.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CreateUserComponent } from '@app/views/create-user/create-user.component';
import { ListUserComponent } from '@app/views/list-user/list-user.component';
import { TodoTodayComponent } from '@app/views/todo-today/todo-today.component';
import { MoneyComponent } from '@app/views/money/money.component';
import { NgJsonEditorModule } from '@maaxgr/ang-jsoneditor';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    NgJsonEditorModule
  ],
  declarations: [
    DashboardComponent,
    CreateUserComponent,
    ListUserComponent,
    TodoTodayComponent,
    MoneyComponent
    ,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
  ],
  providers: [
  ]
})

export class AdminLayoutModule { }
