import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, HomeService } from '@app/_services/_index';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  permission: string;
}
export const ROUTES: RouteInfo[] = [
  { path: 'dashboard', title: 'Dashboard', icon: 'dashboard', class: '', permission: 'isAdmin' },
  { path: 'create-user', title: 'Create User', icon: 'person_add', class: '', permission: 'isGrandAdmin' },
  { path: 'list-user', title: 'List User', icon: 'person_add', class: '', permission: 'isGrandAdmin' },
  { path: 'todo-today', title: 'Todo Today', icon: 'checklist_rtl', class: '', permission: 'isMember' },
  { path: 'money', title: 'Money', icon: 'attach_money', class: '', permission: 'isGrandAdmin' },


  // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
  // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
  // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
  // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
  // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
  // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
  // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  // var
  isLogined = false;
  isMember = false;
  isAdmin = false;
  isGrandAdmin = false;
  username = 'Guest';
  fullName = 'Guest';
  permission = 'GUEST';

  constructor(private api: HomeService, private authService: AuthService, private router: Router) {
    this.isLogined = authService.isLogin();
    if (this.isLogined) {
      this.setUserInfo();
      this.checkPermission();
    }
  }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((status: any) => {
      // console.log('debug', status);
      if (status === true) {
        this.isLogined = true;
        this.checkPermission();
        this.setUserInfo();
      } else {
        this.resetToGuest();
      }
    });

    this.menuItems = ROUTES.filter(menuItem => this[menuItem.permission]);
  }
  checkPermission() {
    this.isAdmin = this.authService.isAdmin();
    this.isGrandAdmin = this.authService.isGrandAdmin();
    this.isMember = this.authService.isMember();
  }
  setUserInfo() {
    const { username, fullName, permission } = this.authService.getUserInfo();
    this.username = username;
    this.fullName = fullName;
    this.permission = ({
      GRAND_ADMIN: 'GRAND ADMIN',
      ADMIN: 'ADMIN',
      MEMBER: 'MEMBER',
    })[permission] || 'GUEST';
  }
  resetToGuest() {
    this.setUserInfo();
    this.checkPermission();
  }

  logout() {
    this.authService.logout()
      .subscribe((res: any) => {
        this.router.navigate(['/']);
      }, err => {
        console.log(err);
      });
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
