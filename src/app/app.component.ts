import { Component, OnInit } from '@angular/core';
import { JsonEditorOptions } from '@maaxgr/ang-jsoneditor';
import { AnalyticService } from './_services/analytic.service';
import { SocketioService } from './_services/socketio.service';


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
    private socketService: SocketioService
  ) {
  }

  showJson(d: Event) {
    // this.visibleData = d;
  }

  ngOnInit(): void {
    this.analyticService.logAccess()
    .subscribe(_ => {}, _ => {});
    this.socketService.setupSocketConnection();
  }
  ngOnDestroy() {
    this.socketService.disconnect();
  }
}
