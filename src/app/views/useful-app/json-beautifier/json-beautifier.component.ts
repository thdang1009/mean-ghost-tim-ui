import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExampleJSON } from '@app/_helpers/fake.data';
import { SAVED_JSON, SAVED_JSON_2 } from '@app/_shares/constant';
import { JsonEditorOptions } from '@maaxgr/ang-jsoneditor';
import diff from 'diff-sequences';

@Component({
  selector: 'json-beautifier',
  templateUrl: './json-beautifier.component.html',
  styleUrls: ['./json-beautifier.component.css']
})
export class JsonBeautifierComponent implements OnInit, OnDestroy {

  public editorOptions: JsonEditorOptions;
  public editorOptions2: JsonEditorOptions;
  public initialData: any;
  public initialData2: any;
  public visibleData: any;
  public visibleData2: any;

  isLoadingResults = false;

  constructor() {
  }

  StringToReadableObject(s: string) {
    return JSON.parse(s);
  }

  ngOnInit(): void {
    this.editorOptions = new JsonEditorOptions()
    this.editorOptions.modes = ['code', 'text', 'tree', 'view'];
    this.editorOptions.mode = this.editorOptions.modes[0];
    this.editorOptions2 = new JsonEditorOptions()
    this.editorOptions2.modes = ['code', 'text', 'tree', 'view'];
    this.editorOptions2.mode = this.editorOptions2.modes[0];
    const sampleJSON = ExampleJSON;
    this.initialData = this.StringToReadableObject(localStorage.getItem(SAVED_JSON) || sampleJSON);
    this.initialData2 = this.StringToReadableObject(localStorage.getItem(SAVED_JSON_2) || sampleJSON);
    this.visibleData = JSON.parse(JSON.stringify(this.initialData));
    this.visibleData2 = JSON.parse(JSON.stringify(this.initialData2));
    window.onbeforeunload = () => this.ngOnDestroy();
  }

  showJson(d: Event) {
    if (d.isTrusted) {
      return;
    }
    this.visibleData = d;
  }

  showJson2(d: Event) {
    if (d.isTrusted) {
      return;
    }
    this.visibleData2 = d;
  }

  ngOnDestroy(): void {
    localStorage.setItem(SAVED_JSON, JSON.stringify(this.visibleData));
    localStorage.setItem(SAVED_JSON_2, JSON.stringify(this.visibleData2));
  }

  findDiff() {
    const a = JSON.stringify(this.visibleData);
    const b = JSON.stringify(this.visibleData2);
    let count = 0;
    function isCommon(aIndex, bIndex) {
      return a[aIndex] === b[bIndex];
    }
    function foundSubsequence(nCommon, aCommon, bCommon) {
      // see examples
      ++count;
      console.log(nCommon, aCommon, bCommon);
      // console.log(nCommon, a[aCommon], b[bCommon]);
    }
    diff(a.length, b.length, isCommon, foundSubsequence);
  }
}
