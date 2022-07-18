import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from '@layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './_layouts/guest-layout/guest-layout.component';
import { TokenInterceptor } from './_helpers/_index';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService, TodoTodayService, NoteService, JobService, HomeService, IssueService } from './_services/_index';
import { DonationComponent } from './views/donation/donation.component';
import { SharedModuleModule } from './_shares/shared-module.module';

// third party
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import {
  AgmCoreModule
} from '@agm/core';
import { NgJsonEditorModule } from '@maaxgr/ang-jsoneditor';
import { AutosizeModule } from 'ngx-autosize';
import { CodeEditorModule } from '@ngstack/code-editor';
import { environment } from '@environments/environment';



// NgModule
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    SharedModuleModule,
    // third party
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    NgJsonEditorModule,
    AutosizeModule,
    CodeEditorModule.forRoot(),
    NgxGoogleAnalyticsModule.forRoot(environment.gaCode),
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    GuestLayoutComponent,
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
    IssueService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
