import { TDTDStatus } from "./constant";


declare var $: any;
export interface GhostSiteResponse {
  status: string,
  data: any,
}
export interface LoginResponse extends GhostSiteResponse {
  token: string
}

export function showNoti(content, type, _timer = 2000) {
  showNotification('top', 'right', content, type, _timer);
}

export function showNotification(from, align, content, type, _timer = 2000) {
  // const type = ['','info','success','warning','danger'];

  $.notify({
    icon: 'notifications',
    message: content

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
  return location.pathname.includes('index');
}

export function nextStatus(oldStatus) {
  return {
    NEW: TDTDStatus.DONE,
    DONE: TDTDStatus.TOMORROW,
    TOMORROW: TDTDStatus.NOT_YET,
    NOT_YET: TDTDStatus.NEW
  }[oldStatus];
}
export function previousStatus(oldStatus) {
  return {
    DONE: TDTDStatus.NEW,
    TOMORROW: TDTDStatus.DONE,
    NOT_YET: TDTDStatus.TOMORROW,
    NEW: TDTDStatus.NOT_YET
  }[oldStatus];
}