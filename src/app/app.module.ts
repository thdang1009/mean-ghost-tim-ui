import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, SecurityContext } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

// my codes
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from '@layouts/admin-layout/admin-layout.component';
import { GuestLayoutComponent } from './_layouts/guest-layout/guest-layout.component';
import { TokenInterceptor } from './_helpers/_index';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService, TodoTodayService, NoteService, JobService, HomeService, IssueService } from './_services/_index';
import { DonationComponent } from './views/donation/donation.component';

// third party
import { NgxGoogleAnalyticsModule } from 'ngx-google-analytics';
import { CodeEditorModule } from '@ngstack/code-editor';
import { environment } from '@environments/environment';
import { AnchorModule } from './_shares/anchor/anchor.module';
import { MarkdownModule, MarkedOptions, ClipboardOptions, ClipboardButtonComponent } from 'ngx-markdown';
import { markedOptionsFactory } from './views/blog-management/blog-management.module';
import { AnchorService } from './_shares/anchor/anchor.service';


// NgModule
@NgModule({
  imports: [
    AnchorModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    // third party
    CodeEditorModule.forRoot(),
    NgxGoogleAnalyticsModule.forRoot(environment.gaCode),
    MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
        deps: [AnchorService],
      },
      clipboardOptions: {
        provide: ClipboardOptions,
        useValue: {
          buttonComponent: ClipboardButtonComponent,
        },
      },
      sanitize: SecurityContext.NONE,
    }),
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
