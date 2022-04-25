import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/_services/_index';
import { isInPDFView } from '@app/_shares/common';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  // permission: string;
}
export const ROUTES: RouteInfo[] = [
  // { path: 'index/angular-index', title: 'Angular', icon: 'person_add', class: ''},
  // { path: 'index/html-index', title: 'HTML', icon: 'person_add', class: ''},
  // { path: 'index/css-index', title: 'Css', icon: 'person_add', class: ''},
  // { path: 'index/javascript-index', title: 'Javascript', icon: 'person_add', class: ''},
  // { path: 'index/git-index', title: 'GIT', icon: 'person_add', class: ''},
  // { path: 'index/nodejs-index', title: 'NodeJS', icon: 'person_add', class: ''},
  // { path: 'index/mongodb-index', title: 'MongoDB', icon: 'person_add', class: ''},
  // { path: 'index/react-index', title: 'Add User', icon: 'person_add', class: ''},
  { path: 'useful-app/run-js', title: 'RunJS', icon: 'javascript', class: '' },
  { path: 'useful-app/json-beautifier', title: 'JSON Beautifier', icon: 'javascript', class: '' },
  { path: 'admin/dashboard', title: 'Amin', icon: 'dashboard', class: '' },
];

@Component({
  selector: 'app-guest-sidebar',
  templateUrl: './guest-sidebar.component.html',
  styleUrls: ['./guest-sidebar.component.css']
})
export class GuestSidebarComponent implements OnInit {

  menuItems: any[];
  isLogined = false;
  stringToSearch = '';
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService) {
    this.isLogined = authService.isLogin();
    if (this.isLogined) {
    }
  }

  ngOnInit(): void {

    this.menuItems = ROUTES;
  }
  _isInPDFView() {
    return isInPDFView();
  }

  search() {
    // alert(this.stringToSearch)
    if (this._isInPDFView()) {
      // call search in pdf
      // just update the ?searchInPDF=...
      this.router.navigate(
        [], 
        {
          relativeTo: this.activatedRoute,
          queryParams: { searchInPDF: this.stringToSearch },
          queryParamsHandling: 'merge'
        });
    } else {
      // call search normal in all page
    }
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
