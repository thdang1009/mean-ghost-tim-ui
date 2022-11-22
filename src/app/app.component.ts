import { Component, OnInit } from '@angular/core';
import { JsonEditorOptions } from '@maaxgr/ang-jsoneditor';
import { AnalyticService, AuthService, SocketioService } from './_services/_index';
import { handleSocket } from './_shares/common';
import { GUEST_MESSAGE_RESPONSE } from './_shares/constant';


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
