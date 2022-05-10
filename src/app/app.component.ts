import { Component } from '@angular/core';
import { JsonEditorOptions } from '@maaxgr/ang-jsoneditor';
import { AnalyticService } from './_services/analytic.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public editorOptions: JsonEditorOptions;
  public initialData: any;
  public visibleData: any;

  constructor(
    private analyticService: AnalyticService
  ) {
    // this.editorOptions = new JsonEditorOptions()
    // this.editorOptions.modes = ['code', 'text', 'tree', 'view'];

    // this.initialData = { "products": [{ "name": "car", "product": [{ "name": "honda", "model": [{ "id": "civic", "name": "civic" }, { "id": "accord", "name": "accord" }, { "id": "crv", "name": "crv" }, { "id": "pilot", "name": "pilot" }, { "id": "odyssey", "name": "odyssey" }] }] }] }
    // this.visibleData = this.initialData;
  }

  showJson(d: Event) {
    // this.visibleData = d;
  }

  ngOnInit(): void {
    this.analyticService.logAccess()
    .subscribe(_ => {}, _ => {});
  }
}
