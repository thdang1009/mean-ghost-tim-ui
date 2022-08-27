import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, SecurityContext } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { AutosizeModule } from 'ngx-autosize';
import { CodeEditorModule } from '@ngstack/code-editor';
import { environment } from '@environments/environment';
import { ClipboardButtonComponent, ClipboardOptions, MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { AnchorModule } from './_shares/anchor/anchor.module';
import { AnchorService } from './_shares/anchor/anchor.service';

export function markedOptionsFactory(anchorService: AnchorService): MarkedOptions {
  const renderer = new MarkedRenderer();

  // fix `href` for absolute link with fragments so that _copy-paste_ urls are correct
  renderer.link = (href: string, title: string, text: string) => {
    return MarkedRenderer.prototype.link.call(renderer, anchorService.normalizeExternalUrl(href), title, text) as string;
  };

  return { renderer };
}

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
    SharedModuleModule,
    // third party
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
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
