import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketioService } from '@app/_services/_index';
import { handleSocketGuestMessage, handleSocketReadingInfo, isInPDFView } from '@app/_shares/common';
import { SK_GUEST_MESSAGE_RESPONSE, SK_READING_INFO_REALTIME_UPDATE } from '@app/_shares/constant';
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
      { path: 'tool/note', title: 'Note', icon: 'notes', class: '', permission: 'isMember' },
      { path: 'tool/guest-message', title: 'List Guest Message', icon: 'list', class: '', permission: 'isGrandAdmin' }
    ]
  },
  {
    path: 'file', title: 'File & Book', icon: 'library_books', class: '', permission: 'isAdmin', hasChild: true,
    children: [
      { path: 'file/file-list', title: 'List Files', icon: 'picture_as_pdf', class: '', permission: 'isAdmin' },
      { path: 'file/file', title: 'Add File', icon: 'post_add', class: '', permission: 'isAdmin' },
      { path: 'file/book', title: 'Book', icon: 'library_books', class: '', permission: 'isAdmin' },
      { path: 'file/view-book', title: 'View Book', icon: 'menu_book', class: '', permission: 'isAdmin' },
    ]
  },
  {
    path: 'blog', title: 'Blog', icon: 'library_books', class: '', permission: 'isMember', hasChild: true,
    children: [
      { path: 'blog/post-list', title: 'List Post', icon: 'list', class: '', permission: 'isMember' },
      { path: 'blog/tag-list', title: 'List Tag', icon: 'list', class: '', permission: 'isAdmin' },
      { path: 'blog/tag', title: 'Add A Tag', icon: 'local_offer', class: '', permission: 'isAdmin' },
      { path: 'blog/category-list', title: 'List Category', icon: 'list', class: '', permission: 'isAdmin' },
      { path: 'blog/category', title: 'Add A Category', icon: 'category', class: '', permission: 'isAdmin' }
    ]
  }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
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
  stringToSearch = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private socketService: SocketioService,
    private activatedRoute: ActivatedRoute
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
      this.socketService.subcribeChanel(SK_GUEST_MESSAGE_RESPONSE, handleSocketGuestMessage, this);
    }
    const isMember = this.authService.isMember();
    if (isMember) {
      this.socketService.subcribeChanel(SK_READING_INFO_REALTIME_UPDATE, handleSocketReadingInfo, this);
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

  search() {
    if (this._isInPDFView) {
      // call search in pdf
      // just update the ?searchInPDF=...
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams: { searchInPDF: this.stringToSearch || null, time: (new Date()).getTime() },
          queryParamsHandling: 'merge'
        });
    } else {
      // call search normal in all page
    }
  }

  _isInPDFView = isInPDFView();

}
