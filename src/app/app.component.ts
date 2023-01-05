import { Component, OnDestroy, OnInit } from '@angular/core';
import { JsonEditorOptions } from '@maaxgr/ang-jsoneditor';
import { AnalyticService, AuthService, SocketioService } from './_services/_index';
import { handleSocketGuestMessage, handleSocketReadingInfo } from './_shares/common';
import { SK_GUEST_MESSAGE_RESPONSE, SK_READING_INFO_REALTIME_UPDATE } from './_shares/constant';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { ReadingInfoService } from './_services/reading-info/reading-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public editorOptions: JsonEditorOptions;
  public initialData: any;
  public visibleData: any;

  constructor(
    private analyticService: AnalyticService,
    private socketService: SocketioService,
    private authService: AuthService,
    private router: Router,
    private titleService: Title,
    private readingInfoService: ReadingInfoService
  ) {
  }

  ngOnInit(): void {
    this.analyticService.logAccess()
      .subscribe(_ => { }, _ => { });
    this.socketService.setupSocketConnection();
    if (this.authService.isMember()) {
      this.readingInfoService.getReadingInfo();
    }
    this.checkSocket();
    this.initAutoTitle();
    window.onbeforeunload = () => this.ngOnDestroy();
  }

  initAutoTitle() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          let routeTitle = '';
          while (route!.firstChild) {
            route = route.firstChild;
          }
          if (route.snapshot.data['title']) {
            routeTitle = route!.snapshot.data['title'];
          }
          return routeTitle;
        })
      )
      .subscribe((title: string) => {
        if (title) {
          this.titleService.setTitle(`${title}`);
        }
      });
  }

  ngOnDestroy() {
    this.socketService.disconnect();
    if (this.authService.isMember()) {
      this.readingInfoService.updateReadingInfo();
    }
  }

  checkSocket() {
    const isAdmin = this.authService.isAdmin();
    if (isAdmin) {
      this.socketService.socket.on(SK_GUEST_MESSAGE_RESPONSE, handleSocketGuestMessage);
    }
    const isMember = this.authService.isMember();
    if (isMember) {
      this.socketService.socket.on(SK_READING_INFO_REALTIME_UPDATE, handleSocketReadingInfo);
    }
  }
}
