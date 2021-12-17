import { Routes } from '@angular/router';
import { LoginComponent } from '@app/views/login/login.component';
import { RegisterComponent } from '@app/views/register/register.component';
import { HomeComponent } from '@app/views/home/home.component';
import { NotLoginGuard } from '@app/views/auth/not-login.guard';
import { LogoutComponent } from '@app/views/logout/logout.component';
import { LoginGuard } from '@app/views/auth/login.guard';

export const GuestLayoutRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [NotLoginGuard] },
    { path: 'logout', component: LogoutComponent },
    { path: 'register', component: RegisterComponent, canActivate: [NotLoginGuard] },
];
