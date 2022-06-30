import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExampleCode } from '@helpers/fake.data';
import { showNoti } from '@shares/common';
import { SAVED_CODE } from '@shares/constant';
import { CodeModel } from '@ngstack/code-editor';
@Component({
  selector: 'app-run-js',
  templateUrl: './run-js.component.html',
  styleUrls: ['./run-js.component.scss']
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
      let timer;
      let metaflag = false;
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
    window.onbeforeunload = () => this.ngOnDestroy();
  }

  saveOnLocal() {
    // console.log('saveOnLocal', this.codeModel.value);
    try {
      localStorage.setItem(SAVED_CODE, this.codeModel.value);
    } catch (e) {
      showNoti('Lỗi lưu local: ' + e, 'danger');
    }
  }

  onCodeChanged(value) {
    // console.log('CODE', value);
  }

  handleCmdSave() {
    this.isLoadingResults = true;
    const code = this.codeModel.value;
    const myJoin = (arr) => {
      return arr.map(el => (typeof el === 'object' || el === undefined) ? JSON.stringify(el) : el).join(' ');
    }
    try {
      const store = [];
      const funcName = '___func';
      window[funcName] = console.log;
      console.log = function (...value) {
        window[funcName](...value);
        const joinedValue = myJoin(value);
        store.push(joinedValue);
        return value;
      };
      /* tslint:disable no-eval */
      eval(code);
      this.store = store;
      // store.forEach(value => window[funcName](value));
      console.log = window[funcName];
      this.saveOnLocal();
    } catch (e) {
      showNoti(e, 'danger');
    }
    this.isLoadingResults = false;
  }
}
