import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { showNoti } from '@app/_shares/common';
import { AuthService } from '@services/_index';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(): boolean {
      const isAdmin = this.authService.isAdmin();
      // if (!isAdmin) {
      //   showNoti('Admin only features, please contact admin to upgrade your account', 'danger');
      // }
    return isAdmin;
  }

}
