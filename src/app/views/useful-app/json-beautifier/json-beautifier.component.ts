import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExampleJSON } from '@app/_helpers/fake.data';
import { SAVED_JSON, SAVED_JSON_2 } from '@app/_shares/constant';
import { JsonEditorOptions } from '@maaxgr/ang-jsoneditor';

@Component({
  selector: 'json-beautifier',
  templateUrl: './json-beautifier.component.html',
  styleUrls: ['./json-beautifier.component.css']
})
export class JsonBeautifierComponent implements OnInit, OnDestroy {

  public editorOptions: JsonEditorOptions;
  public initialData: any;
  public initialData2: any;
  public visibleData: any;
  public visibleData2: any;

  constructor() {
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.modes = ['code', 'text', 'tree', 'view'];
    this.editorOptions.mode = this.editorOptions.modes[0];
    const sampleJSON = ExampleJSON;
    this.initialData = this.StringToReadableObject(localStorage.getItem(SAVED_JSON) || sampleJSON);
    this.initialData2 = this.StringToReadableObject(localStorage.getItem(SAVED_JSON_2) || sampleJSON);
    this.visibleData = this.initialData;
    this.visibleData2 = this.initialData2;
  }

  StringToReadableObject(s: string) {
    return JSON.parse(s);
  }

  ngOnInit(): void {

  }

  showJson(d: Event) {
    this.visibleData = d;
  }

  ngOnDestroy(): void {
    localStorage.setItem(SAVED_JSON, JSON.stringify(this.visibleData));
    localStorage.setItem(SAVED_JSON_2, JSON.stringify(this.visibleData2));
  }
}
