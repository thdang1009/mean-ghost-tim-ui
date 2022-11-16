import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { TodoToday } from '@models/_index';
import * as dateFns from 'date-fns';
import { JobService, TodoTodayService } from '@services/_index';
import { isImportant, nextStatus, previousStatus, showNoti } from '@shares/common';
import { TDTD_STATUS } from '@shares/enum';
import { DEBOUCE_TIME, } from '@shares/constant';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-todo-today',
  templateUrl: './todo-today.component.html',
  styleUrls: ['./todo-today.component.scss']
})
export class TodoTodayComponent implements OnInit {

  data: TodoToday[] = [];
  isLoadingResults = true;
  callListIdTimeout = undefined;
  hoveredIndex = undefined;

  today = dateFns.startOfToday();
  searchDate = new UntypedFormControl(this.today);
  searchDateDisplay = 'ToDay';
  searchStatus = 'NONE';
  statusList = ['NONE', 'NOT_YET', 'DONE', 'TOMORROW'];
  count = 0;
  nextStatus = nextStatus;
  previousStatus = previousStatus;
  TDTD_STATUS = TDTD_STATUS;

  constructor(
    private todoTodayService: TodoTodayService,
    private jobService: JobService,
  ) { }

  ngOnInit() {
    this.searchToDoToDay();
  }

  addToDoToDay() {
    const sample: TodoToday = {
      content: ''
    }
    this.isLoadingResults = true;
    this.todoTodayService.addTodoToday(sample)
      .subscribe((res: any) => {
        this.data.push(res);
        this.isLoadingResults = false;
      }, err => {
        this.isLoadingResults = false;
      });
  }

  searchToDoToDay() {
    this._getMyToDoToDay();
  }

  _getMyToDoToDay(timeout = 0) {
    const value = this.searchDate && this.searchDate.value || new Date();
    const fromDate = dateFns.startOfDay(value);
    const toDate = dateFns.endOfDay(value);
    const req = {
      from: fromDate || undefined,
      to: toDate || undefined,
      status: this.searchStatus === 'NONE' ? undefined : this.searchStatus
    }
    this.isLoadingResults = true;
    this.todoTodayService.getMyTodoToday(req)
      .subscribe((res: any) => {
        this.data = res.map(el => ({
          ...el,
          nextStatus: nextStatus(el.status)
        })).sort(el => isImportant(el.content) ? -1 : 1);
        this.isLoadingResults = false;
      }, err => {
        this.isLoadingResults = false;
      });
  }

  updateStatus(item, index) {
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
    item.content = item.content.trim();
    this.todoTodayService.updateTodoToday(id, item)
      .subscribe((res: any) => {
        this.data[index] = res;
      }, err => {
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
          this._getMyToDoToDay(DEBOUCE_TIME);
          this.isLoadingResults = false;
        }, err => {
          this.isLoadingResults = false;
        });
    }
  }
  delete(id) {
    if (!this.data || !this.data.length) {
      return;
    }
    if (id) {
      this.isLoadingResults = true;
      this.todoTodayService.deleteTodoToday(id)
        .subscribe((_: any) => {
          this.data = this.data.filter(el => el.id !== id);
          this.isLoadingResults = false;
        }, err => {
          this.isLoadingResults = false;
        });
    }
  }
  increaseCount() {
    this.count++;
    if (this.count >= 5) {
      this.count = 0;
      this.triggerJobManually();
    }
  }
  triggerJobManually() {
    const req = {
      jobName: [
        'allToNew'
      ]
    }
    this.jobService.runJobManually(req, new Date)
      .subscribe((_: any) => {
        this.isLoadingResults = false;
      }, err => {
        this.isLoadingResults = false;
      });
  }
  deleteTDTD(tdtd) {
    const val = confirm(`Delete "${tdtd.content}"?`);
    if (val) {
      this.delete(tdtd.id);
    }
  }
  async drop(event: CdkDragDrop<string[]>) {
    const result = await this.sort(event.previousIndex, event.currentIndex);
    if (result === 'fail') {
      showNoti('Sort Fail!', 'danger');
      return;
    }
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }

  sort(preIndex, curIndex) {
    const item = this.data[preIndex];
    const newOrder = Number(this.data[curIndex].order);
    const delta = preIndex > curIndex ? -1 : 1;
    return new Promise<any>((resolve, reject) => {
      const req = {
        ...item,
        order: newOrder + delta
      };
      this.todoTodayService.updateTodoToday(item.id, req)
        .subscribe((_: any) => {
          this.isLoadingResults = false;
          resolve('success');
        }, err => {
          this.isLoadingResults = false;
          reject('fail');
        });
    });
  }
  increaseDate() {
    const val = dateFns.addDays(this.searchDate.value, 1);
    this.searchDate.setValue(val);
  }
  decreaseDate() {
    const val = dateFns.addDays(this.searchDate.value, -1);
    this.searchDate.setValue(val);
  }
  increaseStatus() {
    this.searchStatus = this.nextStatus(this.searchStatus);
  }
  decreaseStatus() {
    this.searchStatus = this.previousStatus(this.searchStatus);
  }
}
