import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketioService } from '@app/_services/_index';
import { handleSocket } from '@app/_shares/common';
import { GUEST_MESSAGE_RESPONSE } from '@app/_shares/constant';
import { AuthService } from '@services/_index';

declare const $: any;

declare interface Child {
  path: string;
  title: string;
  icon: string;
  class: string;
  permission: string;
}
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  permission: string;
  hasChild: boolean;
  children?: Array<Child>;
}
export const ROUTES: RouteInfo[] = [
  { path: 'dashboard', title: 'Dashboard', icon: 'dashboard', class: '', permission: 'isMember', hasChild: false },
  {
    path: 'user-management', title: 'User', icon: 'people', class: '', permission: 'isGrandAdmin', hasChild: true,
    children: [
      { path: 'user-management/add-user', title: 'Add User', icon: 'person_add', class: '', permission: 'isGrandAdmin' },
      { path: 'user-management/user-list', title: 'List User', icon: 'people', class: '', permission: 'isGrandAdmin' }
    ]
  },
  {
    path: 'tool', title: 'Tool', icon: 'handyman', class: '', permission: 'isMember', hasChild: true,
    children: [
      { path: 'tool/todo-today', title: 'Todo Today', icon: 'checklist_rtl', class: '', permission: 'isMember' },
      { path: 'tool/note', title: 'Note', icon: 'library_books', class: '', permission: 'isMember' },
      { path: 'tool/money', title: 'Money', icon: 'attach_money', class: '', permission: 'isGrandAdmin' },
      { path: 'tool/book', title: 'Book', icon: 'library_books', class: '', permission: 'isAdmin' },
      { path: 'tool/file', title: 'Add File', icon: 'post_add', class: '', permission: 'isAdmin' },
      { path: 'tool/file-list', title: 'All Files', icon: 'picture_as_pdf', class: '', permission: 'isAdmin' },
      { path: 'tool/guest-message', title: 'All Guest Message', icon: 'checklist_rtl', class: '', permission: 'isGrandAdmin' }
      // { path: 'tool/food', title: 'Food', icon: 'lunch_dining', class: '', permission: 'isMember' },
    ]
  },
  {
    path: 'blog', title: 'Blog', icon: 'library_books', class: '', permission: 'isMember', hasChild: true,
    children: [
      { path: 'blog/post-list', title: 'All Post', icon: 'library_books', class: '', permission: 'isMember' },
      // { path: 'blog/post-add', title: 'Add A Post', icon: 'post_add', class: '', permission: 'isAdmin' },
      { path: 'blog/tag-list', title: 'All Tag', icon: 'library_books', class: '', permission: 'isAdmin' },
      { path: 'blog/tag', title: 'Add A Tag', icon: 'post_add', class: '', permission: 'isAdmin' },
      { path: 'blog/category-list', title: 'All Category', icon: 'library_books', class: '', permission: 'isAdmin' },
      { path: 'blog/category', title: 'Add A Category', icon: 'post_add', class: '', permission: 'isAdmin' }
    ]
  }
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private socketService: SocketioService
  ) {
    this.isLogined = authService.isLogin();
    if (this.isLogined) {
      this.checkAfterLogin();
    }
  }

  checkAfterLogin() {
    this.setUserInfo();
    this.checkPermission();
    this.checkSocket();
  }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((status: any) => {
      // console.log('debug', status);
      if (status === true) {
        this.isLogined = true;
        this.checkAfterLogin();
      } else {
        this.resetToGuest();
      }
    });
    const checkSubMenu = ROUTES.map(sub => ({
      ...sub,
      children: (sub.children || []).filter(child => this[child.permission])
    }))

    this.menuItems = checkSubMenu.filter(menuItem => this[menuItem.permission]);
  }
  checkSocket() {
    const isAdmin = this.authService.isAdmin();
    if (isAdmin) {
      this.socketService.socket.on(GUEST_MESSAGE_RESPONSE, handleSocket);
    }
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
