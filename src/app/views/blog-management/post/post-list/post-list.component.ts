import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { showNoti, compareWithFunc } from '@shares/common';
import { Post } from '@models/_index';
import { CategoryService, FileService, PostService, TagService } from '@services/_index';
import * as dateFns from 'date-fns';
import { DOCUMENT } from '@angular/common';
import { PostStatus } from '@app/_shares/constant';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  data: Post[] = [];
  isLoadingResults = true;

  today = dateFns.startOfToday();
  lastYearDay = dateFns.subYears(this.today, 5);
  searchDateFrom = new UntypedFormControl(this.lastYearDay);
  searchDateTo = new UntypedFormControl(this.today);
  searchStatus = 'NONE';
  statusList = [PostStatus.NONE, PostStatus.PRIVATE, PostStatus.PUBLIC, PostStatus.PROTECTED];
  itemSelected = undefined;
  isSplitHorizontal = false;
  elem;
  listCategory = [];
  listPermisson = [];
  listTag = [];
  PostStatus = PostStatus;
  listFileOnServer = [];
  compareWithFunc = compareWithFunc;

  constructor(
    @Inject(DOCUMENT) private document,
    private postService: PostService,
    private tagService: TagService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef,
    private fileService: FileService
    // private simpleTimePipe: SimpleTimePipe
  ) {
  }

  ngOnInit() {
    this.elem = document.getElementById('edit-post-container');
    this.listPermisson = [
      PostStatus.PUBLIC,
      PostStatus.PRIVATE
    ];
    this.categoryService.getCategorys()
      .subscribe(listCat => {
        this.listCategory = listCat;
      })
    this.tagService.getTags()
      .subscribe(listTag => {
        this.listTag = listTag;
      });
    this.activatedRoute.queryParams.subscribe(params => {
      const id = Number(params.id);
      if (id) {
        this.getPost(id, _ => {
          this.chooseThisItem(id);
        });
      } else {
        this.searchPost(id);
        this.itemSelected = undefined;
      }
    });

    this.fileService.getMyFile({
      type: 'Image'
    }).subscribe((res: any) => {
      this.listFileOnServer = res;
    }, err => {
      showNoti('Get list file error. ' + err, 'danger');
    });
  }

  getPost(id, cb?) {
    this.isLoadingResults = true;
    this.postService.getPostAsAdmin(id)
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
        this.isLoadingResults = false;
      });
  }

  searchPost(id = undefined) {
    this._getMyPost(id);
  }

  chooseThisItem(id) {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { id: id },
        queryParamsHandling: 'merge'
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
  saveItem(id, item, index = -1, cb) {
    // this.isLoadingResults = true;
    // item.content = item.content.trim();
    this.postService.updatePost(id, item)
      .subscribe((res: any) => {
        if (index !== -1) {
          this.data[index] = res;
        }
        if (cb) {
          cb();
        }
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
    const callback = () => {
      this.itemSelected = undefined;
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams: { id: null },
          queryParamsHandling: 'merge'
        });
    }
    this.saveItem(this.itemSelected.id, this.itemSelected, -1, callback);
  }
  deletePost(post) {
    const val = confirm(`Delete "${post.title}"?`);
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
  onLoad() {

  }

  // tools function 
  openFullscreen() {
    this.splitVertical();
    if (!this.elem) {
      this.elem = document.getElementById('edit-post-container');
    }
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
  }

  /* Close fullscreen */
  closeFullscreen() {
    if (document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
  }
  splitHorizontal() {
    this.isSplitHorizontal = true;
  }
  splitVertical() {
    this.isSplitHorizontal = false;
  }
}
