import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './_layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './_layouts/guest-layout/guest-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'guest/home',
    pathMatch: 'full',
  }, {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./_layouts/admin-layout/admin-layout.module').then(m => { return m.AdminLayoutModule })
    }]
  }, {
    path: 'guest',
    component: GuestLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./_layouts/guest-layout/guest-layout.module').then(m => { return m.GuestLayoutModule })
    }]
  },
  {
    path: '**',
    redirectTo: 'guest/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      // enableTracing: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
