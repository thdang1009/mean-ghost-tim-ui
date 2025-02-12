import { FePDFInfo } from "@app/views/code-index/dymanic-index/dymanic-index.component";
import { TDTD_STATUS } from "./enum";
import { Observable, Subject, of } from "rxjs";
import { HOUR } from "./constant";


declare var $: any;
export interface GhostSiteResponse {
  status: string,
  data: any,
}
export interface LoginResponse extends GhostSiteResponse {
  token: string
}
type NotiType = 'danger' | 'success' | 'error' | 'warning' | 'info';

export function showNoti(content, type: NotiType, _timer = 1000, title = 'Notifications') {
  showNotification('top', 'right', title, content, type, _timer);
}

export function showNotiSocket(content, type, _timer = 1000, title = 'Notifications') {
  showNotification('top', 'left', title, content, type, _timer);
}

export function showNotification(from, align, title, content, type, _timer = 1000) {
  // const type = ['','info','success','warning','danger'];
  if (type === 'error') {
    type = 'danger';
  }
  $.notify({
    icon: 'notifications',
    message: content,
    title: title

  }, {
    type: type,
    timer: _timer,
    placement: {
      from: from,
      align: align
    },
    template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
      '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
      '<i class="material-icons" data-notify="icon">notifications</i> ' +
      '<span data-notify="title">{1}</span> ' +
      '<span data-notify="message">{2}</span>' +
      '<div class="progress" data-notify="progressbar">' +
      '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
      '</div>' +
      '<a href="{3}" target="{4}" data-notify="url"></a>' +
      '</div>'
  });
}
export function buildQueryString(object) {
  const str = [];
  for (const p in object) {
    if (object.hasOwnProperty(p) && object[p]) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(object[p]));
    }
  }
  return str.join('&');
}
export function isImportant(content) {
  return content.includes('**');
}
export function isInPDFView() {
  const pathname = location.pathname;
  return pathname.includes('index') || pathname.includes('view-book');
}
export function checkIsInPDFView(pathname = '') {
  // console.info('dangth', pathname);
  return pathname.includes('index') || pathname.includes('view-book');
}

export function nextStatus(oldStatus) {
  return {
    NEW: TDTD_STATUS.DONE,
    DONE: TDTD_STATUS.TOMORROW,
    TOMORROW: TDTD_STATUS.NOT_YET,
    NOT_YET: TDTD_STATUS.IN_PAST,
    IN_PAST: TDTD_STATUS.NEW
  }[oldStatus];
}
export function previousStatus(oldStatus) {
  return {
    DONE: TDTD_STATUS.NEW,
    TOMORROW: TDTD_STATUS.DONE,
    NOT_YET: TDTD_STATUS.TOMORROW,
    IN_PAST: TDTD_STATUS.NOT_YET,
    NEW: TDTD_STATUS.IN_PAST
  }[oldStatus];
}
export function isValidFile(file) {
  const isValidSize = file.size <= 10 * 1024 * 1024;
  return isValidSize;
}
export function compareWithFunc(a, b) {
  return a == b;
}
export function openExternalLink(link) {
  window.open(link, '_blank');
}
export function mapResourceName(input): FePDFInfo {
  return ({
    'algorithms-index': {
      src: '/algorithms.pdf',
      fileName: 'algorithms'
    },
    'android-index': {
      src: '/android.pdf',
      fileName: 'android'
    },
    'angular-index': {
      src: '/angular.pdf',
      fileName: 'angular'
    },
    'css-index': {
      src: '/css.pdf',
      fileName: 'css'
    },
    'git-index': {
      src: '/git.pdf',
      fileName: 'git'
    },
    'html-index': {
      src: '/html.pdf',
      fileName: 'html'
    },
    'js-index': {
      src: '/js.pdf',
      fileName: 'js'
    },
    'markdown-index': {
      src: '/markdown.pdf',
      fileName: 'markdown'
    },
    'mongodb-index': {
      src: '/mongo.pdf',
      fileName: 'mongo'
    },
    'mysql-index': {
      src: '/mysql.pdf',
      fileName: 'mysql'
    },
    'node-js-index': {
      src: '/nodejs.pdf',
      fileName: 'nodejs'
    },
    'react-index': {
      src: '/react.pdf',
      fileName: 'react'
    },
    'react-native-index': {
      src: '/react-native.pdf',
      fileName: 'react-native'
    },
    'ts-index': {
      src: '/ts.pdf',
      fileName: 'ts'
    },
  })[input]
}

export function handleSocketGuestMessage(arg) {
  try {
    const object = typeof arg === 'string' ? JSON.parse(arg) : arg;
    const content = `${object.name} send: "${object.message}"`;
    showNotiSocket(content, 'info', 3 * HOUR, object.title);
  } catch (e) {

  }
}
export function handleSocketRunCode(params) {
  const value = {
    message: params['message'],
    code: params['code']
  }
  if (params['end']) {
    showNoti(`${value.message}`, 'success');
    this.isRunning = false;
  } else {
    console.log(value);
  }
  this.resultSet = [value, ...this.resultSet];
}

export function handleSocketReadingInfo(arg) {
  try {
    const { username } = JSON.parse(localStorage.getItem('USER_INFO'));
    if (username === arg.username) {
      const key = arg.key || '';
      const targetName = key.includes('bookmark') ? 'Bookmark' : 'Page';
      showNotiSocket(`${targetName} has changed!!`, 'info', undefined, 'You read somewhere else!');
    }
  } catch (e) {
    console.log('handleSocketReadingInfo', e);
  }
}

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

export function handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    console.error(error); // log to console instead
    log(`${operation} failed: ${error.message}`);

    return of(result);
  };
}

export function ghostLog(...params) {
  console.log(...params);
}

function log(message: string) {
  console.log(message);
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
export function getTypeFromUrl(url = '.?') {
  let arr;
  if (url.includes('?')) {
    arr = url.split('?')[0].split('.');
  } else {
    arr = url.split('.');
  }
  return arr[arr.length - 1];
}