import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExampleJSON2 } from '@app/_helpers/fake.data';
import { showNoti } from '@app/_shares/common';
import { SAVED_JSON_EXCEL, SAVED_JSON_EXCEL_2 } from '@app/_shares/constant';
import { JsonEditorOptions } from '@maaxgr/ang-jsoneditor';
import * as XLSX from 'xlsx';


@Component({
  selector: 'json-excel',
  templateUrl: './json-excel.component.html',
  styleUrls: ['./json-excel.component.css']
})
export class JsonExcelComponent implements OnInit {

  public editorOptions: JsonEditorOptions;
  public editorOptions2: JsonEditorOptions;
  public initialData: any;
  public initialData2: any;
  public visibleData: any;
  public visibleData2: any;

  mod = 'jsonToExcel';

  isLoadingResults = false;

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
    const sampleJSON = ExampleJSON2;
    this.initialData = this.StringToReadableObject(localStorage.getItem(SAVED_JSON_EXCEL) || sampleJSON);
    this.initialData2 = this.StringToReadableObject(localStorage.getItem(SAVED_JSON_EXCEL_2) || sampleJSON);
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
    localStorage.setItem(SAVED_JSON_EXCEL, JSON.stringify(this.visibleData));
    localStorage.setItem(SAVED_JSON_EXCEL_2, JSON.stringify(this.visibleData2));
  }

  excelToJSON() {
    this.mod = 'excelToJson';
  }
  jsonToExcel() {
    this.mod = 'jsonToExcel';
  }
  execute() {
    if (this.mod === 'excelToJson') {
      this.exportJSON();
    } else {
      this.exportExcel();
    }
  }
  exportJSON() {

  }
  formatJSONArray(jsonObject) {
    const regex = new RegExp('\:\[.*?\]', 'g');
    const s = JSON.stringify(jsonObject);
    const temp = s.replace(regex, subString => {
      console.log(subString);
      const content = `"${(subString.match(/\[.*\]/)[0] || '')}"`;
      return `:${content}`;
    });
    console.log(temp);
    return JSON.parse(temp);
  }
  exportExcel(): void {
    let json: any;
    let formatedJSON: any;
    try {
      json = this.visibleData;
      // alert(json)
      formatedJSON = this.formatJSONArray(json);
      console.log('formatedJSON', formatedJSON);
    } catch(e) {
      showNoti('Error JSON', 'danger');
    }
    try {
      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      /* json to sheet */
      var ws = XLSX.utils.json_to_sheet(formatedJSON);
      /* book add sheet */
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      /* save to file */
      XLSX.writeFile(wb, `Excel_${new Date}.xlsx`);
    } catch(e) {
      showNoti('Error: ' + e, 'danger');
      showNoti('Only Support Array', 'info');
    }
  }
}
