import { Routes } from '@angular/router';
import { LoginComponent } from '@app/views/auth-management/login/login.component';
import { RegisterComponent } from '@app/views/auth-management/register/register.component';
import { HomeComponent } from '@app/views/home/home.component';
import { NotLoginGuard } from '@app/views/auth-management/auth/not-login.guard';
import { LogoutComponent } from '@app/views/auth-management/logout/logout.component';
import { ConfirmEmailComponent } from '@app/views/user-management/confirm-email/confirm-email.component';
import { DonationComponent } from '@app/views/donation/donation.component';
import { PostDetailComponent } from '@app/views/blog-management/post/post-detail/post-detail.component';
// import { PostByComponent } from '@app/views/blog-management/post/post-by/post-by.component';
// import { AngularIndexComponent } from '@app/views/angular-index/angular-index.component';
// import { CssIndexComponent } from '@app/views/css-index/css-index.component';
// import { HtmlIndexComponent } from '@app/views/html-index/html-index.component';
// import { RunJsComponent } from '@app/views/run-js/run-js.component';
// import { JsonBeautifierComponent } from '@app/views/json-beautifier/json-beautifier.component';

export const GuestLayoutRoutes: Routes = [
    { path: 'post-read/:ref', component: PostDetailComponent },
    // { path: 'post-by', component: PostByComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [NotLoginGuard] },
    { path: 'logout', component: LogoutComponent },
    { path: 'register', component: RegisterComponent, canActivate: [NotLoginGuard] },
    { path: 'donation', component: DonationComponent },
    {
        path: 'me',
        children: [{
            path: '',
            loadChildren: () => import('../../views/me/me.module').then(m => m.MeModule),
            canActivate: []
        }]
    },
    {
        path: 'index',
        children: [{
            path: '',
            loadChildren: () => import('../../views/code-index/code-index.module').then(m => m.CodeIndexModule),
            canActivate: []
        }]
    },
    {
        path: 'useful-app',
        children: [{
            path: '',
            loadChildren: () => import('../../views/useful-app/useful-app.module').then(m => { return m.UsefulAppModule }),
            canActivate: []
        }]
    },
    {
        path: 'confirm-email/:confirmationCode',
        component: ConfirmEmailComponent
    },
];
