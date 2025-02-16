import { Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { TodoToday } from '@models/_index';
import * as dateFns from 'date-fns';
import { JobService, TodoTodayService } from '@services/_index';
import { isImportant, nextStatus, previousStatus, showNoti, toggleStatus } from '@shares/common';
import { TDTD_STATUS } from '@shares/enum';
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
  statusList = ['NONE', 'NOT_YET', 'DONE', 'TOMORROW', 'IN_PAST'];
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
        this.data = res.map(el => {
          return {
            ...el,
            checked: el.status === TDTD_STATUS.DONE
          }
        }).sort(el => isImportant(el.content) ? -1 : 1);
        this.isLoadingResults = false;
      }, err => {
        this.isLoadingResults = false;
      });
  }
  setChangedLineOnly(res, index) {
    this.data[index] = { ...res, checked: res.status === TDTD_STATUS.DONE };
  }
  updateStatus(item, index) {
    const req = {
      ...item,
      status: toggleStatus(item.status)
    };
    this.isLoadingResults = true;
    this.todoTodayService.updateTodoToday(item.id, req)
      .subscribe((res: any) => {
        this.setChangedLineOnly(res, index);
        this.isLoadingResults = false;
      }, err => {
        this.isLoadingResults = false;
      });
  }
  saveItem(id, item, index) {
    item.content = item.content.trim();
    this.todoTodayService.updateTodoToday(id, item)
      .subscribe((res: any) => {
        this.setChangedLineOnly(res, index);
      }, err => {
      });
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
