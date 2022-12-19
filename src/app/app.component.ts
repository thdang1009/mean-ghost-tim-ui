import { Component, OnInit } from '@angular/core';
import { JsonEditorOptions } from '@maaxgr/ang-jsoneditor';
import { AnalyticService, AuthService, SocketioService } from './_services/_index';
import { handleSocket } from './_shares/common';
import { GUEST_MESSAGE_RESPONSE } from './_shares/constant';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public editorOptions: JsonEditorOptions;
  public initialData: any;
  public visibleData: any;

  constructor(
    private analyticService: AnalyticService,
    private socketService: SocketioService,
    private authService: AuthService,
    private router: Router,
    private titleService: Title
  ) {
  }

  showJson(d: Event) {
    // this.visibleData = d;
  }

  ngOnInit(): void {
    this.analyticService.logAccess()
      .subscribe(_ => { }, _ => { });
    this.socketService.setupSocketConnection();
    this.checkSocket();
    this.initAutoTitle();
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
          console.log('debug, routeTitle=', routeTitle);
          return routeTitle;
        })
      )
      .subscribe((title: string) => {
        console.log('debug, title=', title);
        if (title) {
          this.titleService.setTitle(`${title}`);
        }
      });
  }


  ngOnDestroy() {
    this.socketService.disconnect();
  }
  checkSocket() {
    const isAdmin = this.authService.isAdmin();
    if (isAdmin) {
      this.socketService.socket.on(GUEST_MESSAGE_RESPONSE, handleSocket);
    }
  }
}
