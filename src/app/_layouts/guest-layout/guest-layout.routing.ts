import { Routes } from '@angular/router';
import { LoginComponent } from '@app/views/login/login.component';
import { RegisterComponent } from '@app/views/register/register.component';
import { HomeComponent } from '@app/views/home/home.component';
import { NotLoginGuard } from '@app/views/auth/not-login.guard';
import { LogoutComponent } from '@app/views/logout/logout.component';
import { AboutMeComponent } from '@app/views/about-me/about-me.component';
import { AngularIndexComponent } from '@app/views/angular-index/angular-index.component';
import { CssIndexComponent } from '@app/views/css-index/css-index.component';
import { HtmlIndexComponent } from '@app/views/html-index/html-index.component';
import { RunJsComponent } from '@app/views/run-js/run-js.component';
import { JsonBeautifierComponent } from '@app/views/json-beautifier/json-beautifier.component';

export const GuestLayoutRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [NotLoginGuard] },
    { path: 'logout', component: LogoutComponent },
    { path: 'register', component: RegisterComponent, canActivate: [NotLoginGuard] },
    { path: 'about-me', component: AboutMeComponent },
    { path: 'angular-index', component: AngularIndexComponent },
    { path: 'css-index', component: CssIndexComponent },
    { path: 'html-index', component: HtmlIndexComponent },
    { path: 'run-js', component: RunJsComponent },
    { path: 'json-beautifier', component: JsonBeautifierComponent },
];
