import { Routes } from '@angular/router';
import { LoginComponent } from '@app/views/login/login.component';
import { RegisterComponent } from '@app/views/register/register.component';
import { HomeComponent } from '@app/views/home/home.component';

export const GuestLayoutRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];
