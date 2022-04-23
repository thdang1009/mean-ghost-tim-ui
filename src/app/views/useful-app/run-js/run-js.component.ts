import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExampleCode } from '@app/_helpers/fake.data';
import { showNoti } from '@app/_shares/common';
import { SAVED_CODE } from '@app/_shares/constant';
import { CodeModel } from '@ngstack/code-editor';
@Component({
  selector: 'run-js',
  templateUrl: './run-js.component.html',
  styleUrls: ['./run-js.component.css']
})
export class RunJsComponent implements OnInit, OnDestroy {

  theme = 'vs-dark';

  codeModel: CodeModel = {
    language: 'javascript',
    uri: 'main.js',
    value: localStorage.getItem(SAVED_CODE) || ExampleCode,
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true,
    },
  };
  isLoadingResults = false;
  store = [];

  constructor() {
  }

  ngOnDestroy(): void {
    this.saveOnLocal();
  }

  ngOnInit(): void {
    const handleFunction = this.handleCmdSave.bind(this);
    // showNoti('Command + S to run code', 'info');
    (function () {
      var timer;
      var metaflag = false;
      document.addEventListener('keydown', function (event) {
        if (event.ctrlKey || event.metaKey || event.which === 19) {
          //      ctrl           cmd(mac)         break/pause key(?)
          metaflag = true;
          timer = Date.now();
        }
        if (metaflag && event.which === 83 && Date.now() - timer < 100) {
          //                 "S"                                //100ms
          event.preventDefault(); // maybe not necessary
          handleFunction();
          metaflag = false;
        }
      });
    })();
  }

  saveOnLocal() {
    console.log('saveOnLocal', this.codeModel.value);
    localStorage.setItem(SAVED_CODE, this.codeModel.value);
  }

  onCodeChanged(value) {
    // console.log('CODE', value);
  }

  handleCmdSave() {
    this.isLoadingResults = true;
    let code = this.codeModel.value;
    try {
      const store = [];
      const funcName = '___func';
      window[funcName] = console.log;
      console.log = function (value) {
        window[funcName](value);
        store.push(value);
        return value;
      };
      eval(code);
      this.store = store;
      // store.forEach(value => window[funcName](value));
      console.log = window[funcName];
      this.saveOnLocal();
    }
    catch (e) {
      showNoti(e, 'danger');
    }
    this.isLoadingResults = false;
  }
}
