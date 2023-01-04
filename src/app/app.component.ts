import { Component, OnDestroy, OnInit } from '@angular/core';
import { JsonEditorOptions } from '@maaxgr/ang-jsoneditor';
import { AnalyticService, AuthService, SocketioService } from './_services/_index';
import { handleSocket, showNoti } from './_shares/common';
import { GUEST_MESSAGE_RESPONSE } from './_shares/constant';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { ReadingInfoService } from './_services/reading-info/reading-info.service';
import { ReadingInfo } from './_models/_index';


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
      this.getReadingInfo();
    }
    this.checkSocket();
    this.initAutoTitle();
    window.onbeforeunload = () => this.ngOnDestroy();
  }

  getReadingInfo() {
    this.readingInfoService.getMyReadingInfo()
      .subscribe((res: ReadingInfo) => {
        const jsonObject = res.info;
        Object.entries(jsonObject).forEach(([key, value]) => {
          localStorage.setItem(key, value);
        });
      }, err => {
        showNoti(`Error when get Reading Info: ${err}`, 'danger');
      });
  }

  updateReadingInfo() {
    const newReadingInfo = new ReadingInfo();
    this.readingInfoService.updateReadingInfo(newReadingInfo)
      .subscribe((_: ReadingInfo) => {

      }, err => {
        showNoti(`Error when update Reading Info: ${err}`, 'danger');
      });
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
      this.updateReadingInfo();
    }
  }

  checkSocket() {
    const isAdmin = this.authService.isAdmin();
    if (isAdmin) {
      this.socketService.socket.on(GUEST_MESSAGE_RESPONSE, handleSocket);
    }
  }
}
