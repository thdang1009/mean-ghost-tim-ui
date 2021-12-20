import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/_services/user.service';
import { showNoti } from '@app/_shares/common';

@Component({
  selector: 'list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers()
      .subscribe(users => {
        // showNoti('Get users success!', 'success');
        this.users = users;
      }, (err) => {
        console.log(err);
        showNoti(`Create user fail!`, 'danger');
      });
  }

}
