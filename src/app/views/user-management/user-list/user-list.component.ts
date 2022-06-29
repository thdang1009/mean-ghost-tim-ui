import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/_index';
import { showNoti } from '@shares/common';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {


  users = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
        // showNoti('Get users success!', 'success');
        this.users = users;
      }, (err) => {
        console.log(err);
        showNoti(`Create user fail!`, 'danger');
      });
  }
}
