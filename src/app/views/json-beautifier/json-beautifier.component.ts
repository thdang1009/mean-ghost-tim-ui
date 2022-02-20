import { Component, OnInit, ViewChild } from '@angular/core';
import { schema } from '@app/_configs/config';
import { JsonEditorOptions } from "@maaxgr/ang-jsoneditor";

@Component({
  selector: 'json-beautifier',
  templateUrl: './json-beautifier.component.html',
  styleUrls: ['./json-beautifier.component.css']
})
export class JsonBeautifierComponent implements OnInit {
  public editorOptions: JsonEditorOptions;
  public initialData: any;
  public visibleData: any;

  constructor() {
    // this.editorOptions = new JsonEditorOptions()
    // this.editorOptions.modes = ['code', 'text', 'tree', 'view'];

    // this.initialData = { "products": [{ "name": "car", "product": [{ "name": "honda", "model": [{ "id": "civic", "name": "civic" }, { "id": "accord", "name": "accord" }, { "id": "crv", "name": "crv" }, { "id": "pilot", "name": "pilot" }, { "id": "odyssey", "name": "odyssey" }] }] }] }
    // this.visibleData = this.initialData;
  }

  showJson(d: Event) {
    this.visibleData = d;
  }


  ngOnInit(): void {
  }
}
