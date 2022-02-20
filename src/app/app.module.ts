import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import {
  AgmCoreModule
} from '@agm/core';

import { AdminLayoutComponent } from '@layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './_layouts/guest-layout/guest-layout.component';
import { LogoutComponent } from './views/logout/logout.component';
import { TokenInterceptor } from './_helpers/_index';
import { AboutMeComponent } from './views/about-me/about-me.component';
import { HtmlIndexComponent } from './views/html-index/html-index.component';
import { CssIndexComponent } from './views/css-index/css-index.component';
import { AngularIndexComponent } from './views/angular-index/angular-index.component';
import { RunJsComponent } from './views/run-js/run-js.component';
import { NgJsonEditorModule } from '@maaxgr/ang-jsoneditor';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    NgJsonEditorModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    GuestLayoutComponent,
    LogoutComponent,
    AboutMeComponent,
    HtmlIndexComponent,
    CssIndexComponent,
    AngularIndexComponent,
    RunJsComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
