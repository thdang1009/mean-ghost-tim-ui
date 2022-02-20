import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoTodayService } from '@app/_services/todo-today.service';
import { showNoti } from '@app/_shares/common';
import { TodoToday } from '../../_models/todo-today';
import * as dateFns from 'date-fns';
// import { SimpleTimePipe } from '@app/_pipes/ghost-date.pipe';

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

  constructor(
    private todoTodayService: TodoTodayService,
    // private simpleTimePipe: SimpleTimePipe
    ) { }

  ngOnInit() {
    this.searchToDoToDay();
  }

  addToDoToDay() {
    const sample: TodoToday = {
      content: ''
    }
    this.todoTodayService.addTodoToday(sample)
      .subscribe((res: any) => {
        this.data.push(res);
        this.isLoadingResults = false;
      }, err => {
        // console.log(err);
        this.isLoadingResults = false;
      });
  }

  searchToDoToDay() {
    this.getMyToDoToDay();
  }

  getMyToDoToDay() {
    const value = this.searchDate && this.searchDate.value || new Date();
    const fromDate = dateFns.startOfDay(value);
    const toDate = dateFns.endOfDay(value);
    // const fromDate = dateFns.startOfDay(dateFns.subDays(new Date(), 7));
    // const toDate = dateFns.endOfDay(dateFns.addDays(new Date(), 7));
    const req = {
      from: fromDate || undefined,
      to: toDate || undefined,
      status: this.searchStatus === 'NONE' && undefined || this.searchStatus
    }
    this.isLoadingResults = true;
    this.todoTodayService.getMyTodoToday(req)
      .subscribe((res: any) => {
        this.data = res;
        // this.searchDateDisplay = this.simpleTimePipe.transform(value);
        this.isLoadingResults = false;
      }, err => {
        this.isLoadingResults = false;
      });
  }
  updateStatus(item, index) {
    // console.log(item);
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
        this.data[index] = res;
        this.isLoadingResults = false;
      }, err => {
        this.isLoadingResults = false;
      });
  }
  saveItem(id, item, index) {
    this.isLoadingResults = true;
    item.content = item.content.trim();
    this.todoTodayService.updateTodoToday(id, item)
      .subscribe((res: any) => {
        this.data[index] = res;
        this.isLoadingResults = false;
      }, err => {
        this.isLoadingResults = false;
      });
  }
  deleteLast() {
    this.isLoadingResults = true;
    if (!this.data || !this.data.length) {
      return;
    }
    const lastIndex = this.data.length - 1;
    const id = this.data[lastIndex].id;
    if (id) {
      this.todoTodayService.deleteTodoToday(id)
        .subscribe((_: any) => {
          this.data.pop();
          this.isLoadingResults = false;
        }, err => {
          this.isLoadingResults = false;
        });
    }
  }
}
