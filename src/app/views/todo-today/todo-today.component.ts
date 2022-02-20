import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoTodayService } from '@app/_services/todo-today.service';
import { showNoti } from '@app/_shares/common';
import { TodoToday } from '../../_models/todo-today';
import * as dateFns from 'date-fns';

@Component({
  selector: 'app-todo-today',
  templateUrl: './todo-today.component.html',
  styleUrls: ['./todo-today.component.scss']
})
export class TodoTodayComponent implements OnInit {

  data: TodoToday[] = [];
  isLoadingResults = true;

  today = dateFns.startOfToday();
  searchDate = new FormControl(this.today);
  searchDateDisplay = 'ToDay';
  searchStatus = 'NONE';
  statusList = ['NONE', 'NOT_YET', 'DONE', 'TOMORROW'];

  popupContent = '';

  constructor(private todoTodayService: TodoTodayService) { }

  ngOnInit() {
    // this.addToDoToDay();
    this.searchToDoToDay();
  }

  addToDoToDay() {
    /*
      date: { type: Date, default: Date.now },
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      content: String, // json string
      status: String
    */
    const sample: TodoToday = {
      content: ''
    }
    this.todoTodayService.addTodoToday(sample)
      .subscribe((res: any) => {
        // this.data = res;
        // console.log(this.data);
        this.searchToDoToDay();
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  searchToDoToDay() {
    this.getMyToDoToDay();
  }

  getMyToDoToDay() {
    // const fromDate = dateFns.startOfDay(this.searchDate && this.searchDate.value || new Date());
    const fromDate = dateFns.startOfDay(dateFns.subDays(new Date(), 7));
    const toDate = dateFns.endOfDay(dateFns.addDays(new Date(), 7));
    // const toDate = dateFns.endOfDay(this.searchDate && this.searchDate.value || new Date());
    const req = {
      from: fromDate || undefined,
      to: toDate || undefined,
      status: this.searchStatus === 'NONE' && undefined || this.searchStatus
    }
    this.isLoadingResults = true;
    // const formatDate = (input) => {
    //   const _input = new Date(input);
    //   const isYesterday = dateFns.isYesterday(_input);
    //   const isTomorrow = dateFns.isTomorrow(_input);
    //   const isToday = dateFns.isToday(_input);
    //   if (isToday) {
    //     return 'Hôm nay';
    //   } else if (isYesterday) {
    //     return 'Hôm qua';
    //   } else if (isTomorrow) {
    //     return 'Ngày mai';
    //   } else {
    //     return _input;
    //   }
    // }
    this.todoTodayService.getMyTodoToday(req)
      .subscribe((res: any) => {
        this.data = res;
        console.log(this.data);
        // showNoti(`Get Your ToDo ToDay success!`, 'success');
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
  updateStatus(item) {
    console.log(item);
    const nextStatus = (oldStatus) => ({
      'NEW': 'DONE',
      'DONE': 'NOT_YET',
      'NOT_YET': 'TOMORROW',
      'TOMORROW': 'NEW'
    }[oldStatus])
    const req = {
      ...item,
      status: nextStatus(item.status)
    };
    this.isLoadingResults = true;
    this.todoTodayService.updateTodoToday(item.id, req)
      .subscribe((res: any) => {
        const index = this.data.findIndex(el => el.id === item.id);
        this.data[index] = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
  saveItem(id, item) {
    this.isLoadingResults = true;
    this.todoTodayService.updateTodoToday(id, item)
      .subscribe((res: any) => {
        const index = this.data.findIndex(el => el.id === item.id);
        this.data[index] = res;
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
  deleteLast() {
    this.isLoadingResults = true;
    const id = this.data[this.data.length - 1].id;
    if (id) {
      this.todoTodayService.deleteTodoToday(id)
        .subscribe((res: any) => {
          this.data.pop();
          this.isLoadingResults = false;
        }, err => {
          console.log(err);
          this.isLoadingResults = false;
        });
    }
  }
}
