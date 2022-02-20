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
      content: 'Hôm nay phải code xong ToDo ToDay'
    }
    this.todoTodayService.addTodoToday(sample)
      .subscribe((res: any) => {
        this.data = res;
        console.log(this.data);
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
        showNoti(`Get Your ToDo ToDay success!`, 'success');
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
}
