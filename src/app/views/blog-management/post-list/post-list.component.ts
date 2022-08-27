import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { showNoti } from '@shares/common';
import { Post } from '@models/_index';
import { PostService } from '@services/_index';
import * as dateFns from 'date-fns';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  data: Post[] = [];
  isLoadingResults = true;

  today = dateFns.startOfToday();
  lastYearDay = dateFns.subYears(this.today, 1);
  searchDateFrom = new FormControl(this.today);
  searchDateTo = new FormControl(this.lastYearDay);
  searchStatus = 'NONE';
  statusList = ['NONE', 'PRIVATE', 'PUBLIC', 'PROTECTED'];
  itemSelected = undefined;

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef
    // private simpleTimePipe: SimpleTimePipe
  ) { }

  ngOnInit() {
    console.log('debug 1');
    this.activatedRoute.queryParams.subscribe(params => {
      const id = Number(params.id);
      if (id) {
        this.chooseThisItem(id);
      } else {
        this.searchPost(id);
      }
    });
  }

  getPost(id, cb?) {
    this.isLoadingResults = true;
    this.postService.getPost(id)
      .subscribe(
        res => {
          this.itemSelected = res;
          if (cb) {
            cb();
          }
        },
        _ => { },
        () => {
          this.isLoadingResults = false;
        });
  }

  addPost() {
    const sample: Post = {
      content: ''
    }
    this.postService.addPost(sample)
      .subscribe((res: any) => {
        this.data.unshift(res);
        this.isLoadingResults = false;
      }, err => {
        // console.log(err);
        this.isLoadingResults = false;
      });
  }

  searchPost(id = undefined) {
    this._getMyPost(id);
  }

  chooseThisItem(id) {
    this.getPost(id, _ => {
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams: { id: id },
          queryParamsHandling: 'merge'
        });
    });
  }

  _getMyPost(id = undefined) {
    const from = this.searchDateFrom && this.searchDateFrom.value || new Date();
    const to = this.searchDateTo && this.searchDateTo.value || new Date();
    const fromDate = dateFns.startOfDay(from);
    const toDate = dateFns.endOfDay(to);
    // const fromDate = dateFns.startOfDay(dateFns.subDays(new Date(), 7));
    // const toDate = dateFns.endOfDay(dateFns.addDays(new Date(), 7));
    const req = {
      from: fromDate || undefined,
      to: toDate || undefined,
      status: this.searchStatus === 'NONE' && undefined || this.searchStatus
    }
    this.isLoadingResults = true;
    this.postService.getMyPost(req)
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
  saveItem(id, item, index) {
    // this.isLoadingResults = true;
    item.content = item.content.trim();
    this.postService.updatePost(id, item)
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
    this.callDeletePost(id);
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
  deletePost(post) {
    const val = confirm(`Delete "${post.header}"?`);
    if (val) {
      this.callDeletePost(post.id);
    }
  }
  callDeletePost(id) {
    if (id) {
      this.isLoadingResults = true;
      this.postService.deletePost(id)
        .subscribe((_: any) => {
          this.data = this.data.filter(el => el.id !== id);
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
      this.postService.updatePost(item.id, req)
        .subscribe((_: any) => {
          this.isLoadingResults = false;
          resolve('success');
        }, err => {
          this.isLoadingResults = false;
          reject('fail');
        });
    });
  }
  onReady() {

  }
}
