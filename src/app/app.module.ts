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
import { TokenInterceptor } from './_helpers/_index';
import { AboutMeComponent } from './views/about-me/about-me.component';
import { NgJsonEditorModule } from '@maaxgr/ang-jsoneditor';
import { DatePipe } from '@angular/common';
import { AutosizeModule } from 'ngx-autosize';
import { AuthService, TodoTodayService, NoteService, JobService, HomeService } from './_services/_index';
import { CodeEditorModule } from '@ngstack/code-editor';
import { DonationComponent } from './views/donation/donation.component';
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    // third party
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    NgJsonEditorModule,
    AutosizeModule,
    CodeEditorModule.forRoot(),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    GuestLayoutComponent,
    AboutMeComponent,
    DonationComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    DatePipe,
    NoteService,
    TodoTodayService,
    JobService,
    AuthService,
    HomeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
