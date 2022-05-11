import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { showNoti } from '@app/_shares/common';
import { Note } from '@models/note';
import { NoteService } from '@services/note.service';
import * as dateFns from 'date-fns';

@Component({
  selector: 'note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  data: Note[] = [];
  isLoadingResults = true;
  
  today = dateFns.startOfToday();
  searchDate = new FormControl(this.today);
  // searchDateDisplay = 'ToDay';
  searchStatus = 'NONE';
  statusList = ['NONE', 'NOT_YET', 'DONE', 'TOMORROW'];
  itemSelected = undefined;

  constructor(
    private noteService: NoteService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef
    // private simpleTimePipe: SimpleTimePipe
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const id = Number(params.id);
      this.searchNote(id);
    });
  }

  addNote() {
    const sample: Note = {
      content: ''
    }
    this.noteService.addNote(sample)
      .subscribe((res: any) => {
        this.data.unshift(res);
        this.isLoadingResults = false;
      }, err => {
        // console.log(err);
        this.isLoadingResults = false;
      });
  }

  searchNote(id = undefined) {
    this.getMyNote(id);
  }

  chooseThisItem(item) {
    this.itemSelected = item;
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: { id: item.id },
        queryParamsHandling: 'merge'
      });
  }

  getMyNote(id = undefined) {
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
    this.noteService.getMyNote(req)
      .subscribe((res: any) => {
        this.data = res;
        if (id) {
          this.itemSelected = res.filter(el => el.id === id)[0];
          this.ref.markForCheck();
        }
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
    this.noteService.updateNote(item.id, req)
      .subscribe((res: any) => {
        this.data[index] = res;
        this.isLoadingResults = false;
      }, err => {
        this.isLoadingResults = false;
      });
  }
  saveItem(id, item, index) {
    // this.isLoadingResults = true;
    item.content = item.content.trim();
    this.noteService.updateNote(id, item)
      .subscribe((res: any) => {
        this.data[index] = res;
        // this.isLoadingResults = false;
      }, err => {
        // this.isLoadingResults = false;
      });
  }
  deleteLast() {
    this.isLoadingResults = true;
    if (!this.data || !this.data.length) {
      return;
    }
    const lastIndex = this.data.length - 1;
    const id = this.data[lastIndex].id;
    this.callDeleteNote(id);
  }
  back() {
    this.itemSelected = undefined;
    this.router.navigate(
      [], 
      {
        relativeTo: this.activatedRoute,
        queryParams: { id: null },
        queryParamsHandling: 'merge'
      });
  }
  deleteNote(note) {
    const val = confirm(`Delete "${note.header}"?`);
    if (val) {
      this.callDeleteNote(note.id);
    }
  }
  callDeleteNote(id) {
    if (id) {
      this.isLoadingResults = true;
      this.noteService.deleteNote(id)
        .subscribe((_: any) => {
          this.data = this.data.filter(el => el.id != id);
          this.isLoadingResults = false;
        }, err => {
          this.isLoadingResults = false;
        });
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
      this.noteService.updateNote(item.id, req)
        .subscribe((_: any) => {
          this.isLoadingResults = false;
          resolve('success');
        }, err => {
          this.isLoadingResults = false;
          reject('fail');
        });
    });
  }
}
