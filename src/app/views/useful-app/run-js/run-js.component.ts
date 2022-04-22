import { Component, OnInit } from '@angular/core';
import { CodeModel } from '@ngstack/code-editor';

@Component({
  selector: 'run-js',
  templateUrl: './run-js.component.html',
  styleUrls: ['./run-js.component.css']
})
export class RunJsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  theme = 'vs-dark';

  codeModel: CodeModel = {
    language: 'javascript',
    uri: 'main.js',
    value: '{}',
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true,
    },
  };

  onCodeChanged(value) {
    console.log('CODE', value);
  }
}
