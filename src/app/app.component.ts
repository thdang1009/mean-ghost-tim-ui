import { Component, OnInit } from '@angular/core';
import { JsonEditorOptions } from '@maaxgr/ang-jsoneditor';
import { AnalyticService } from './_services/analytic.service';
import { AuthService } from './_services/auth.service';
import { SocketioService } from './_services/socketio.service';
import { showNotiSocket } from './_shares/common';
import { GUESS_MESSAGE_RESPONSE, HOUR } from './_shares/constant';


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
      this.socketService.socket.on(GUESS_MESSAGE_RESPONSE, (arg) => {
        try {
          const object = JSON.parse(arg);
          const content = `${object.name} send: "${object.message}"`;
          showNotiSocket(content, 'info', 5 * HOUR, object.title);
        } catch (e) {

        }
      });
    }
  }
}
