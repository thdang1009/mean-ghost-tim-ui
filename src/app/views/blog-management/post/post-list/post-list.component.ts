import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { showNoti, compareWithFunc } from '@shares/common';
import { Post } from '@models/_index';
import { PostService } from '@services/_index';
import * as dateFns from 'date-fns';
import { POST_STATUS, POST_TYPE } from '@app/_shares/enum';
import { PostSaveWrapper } from '../post-edit/post-edit.component';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  data: Post[] = [];
  isLoadingResults = true;
  POST_TYPE = POST_TYPE;
  listPostType = [
    POST_TYPE.GHOST_EDITOR,
    POST_TYPE.MARKDOWN
  ];

  today = dateFns.startOfToday();
  lastYearDay = dateFns.subYears(this.today, 5);
  searchDateFrom = new UntypedFormControl(this.lastYearDay);
  searchDateTo = new UntypedFormControl(this.today);
  searchStatus = 'NONE';
  statusList = [POST_STATUS.NONE, POST_STATUS.PRIVATE, POST_STATUS.PUBLIC, POST_STATUS.PROTECTED];
  itemSelected: any = {} as any;
  editMode = false;
  // newTag = { _id: 'Add more', name: '+ Add more tag' };
  // newCategory = { _id: 'Add more', name: '+ Add more category' };
  // moreTagMode = false;
  // moreCategoryMode = false;
  // newTagName = '';
  // newCategoryName = '';

  constructor(
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const id = Number(params.id);
      if (id) {
        this.getPost(id, _ => {
          this.chooseThisItem(id);
        });
      } else {
        this.searchPost(id);
        this.itemSelected = {};
        this.editMode = false;
      }
    });
  }

  // newTagChange() {
  //   console.log(this.newTagName);
  //   // debounce(this.createTag, 1000);
  //   this.createTag();
  // }

  // newCategoryChange() {
  //   console.log(this.newCategoryName);
  //   // debounce(this.createCategory, 1000);
  //   this.createCategory();
  // }

  // createCategory() {
  //   const val = confirm(`Add "${this.newCategoryName}"?`);
  //   if (val) {
  //     this.categoryService.createCategoryWithName(this.newCategoryName)
  //       .subscribe(_ => {
  //         this.getCategories();
  //         this.moreCategoryMode = false;
  //         this.newCategoryName = '';
  //       });
  //   }
  // }

  // createTag() {
  //   const val = confirm(`Add "${this.newTagName}"?`);
  //   if (val) {
  //     this.tagService.createTagWithName(this.newTagName)
  //       .subscribe(_ => {
  //         this.getTags();
  //         this.moreTagMode = false;
  //         this.newTagName = '';
  //       });
  //   }
  // }

  // onChooseCategory(e) {
  //   this.moreCategoryMode = this.moreCategoryMode || (e && e.includes('Add more'));
  //   this.focusById('more-category-field');
  // }

  // onChooseTag(e) {
  //   // console.log('onChooseTag', e);
  //   this.moreTagMode = this.moreTagMode || (e && e.includes('Add more'));
  //   this.focusById('more-tag-field');
  // }

  // focusById(id) {
  //   setTimeout(() => {
  //     const element = document.getElementById(id);
  //     element.focus();
  //   }, 200)
  // }

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
    this.funcGetAllPost(id);
  }

  chooseThisItem(id) {
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { id: id },
        queryParamsHandling: 'merge'
      });
    this.editMode = true;
  }

  funcGetAllPost(id = undefined) {
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
    this.postService.getAllPost(req)
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
  deleteLast() {
    this.isLoadingResults = true;
    if (!this.data || !this.data.length) {
      return;
    }
    const lastIndex = this.data.length - 1;
    const id = this.data[lastIndex].id;
    this.callDeletePost(id);
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
  saveItem({ item, isBack }: PostSaveWrapper) {
    const callback = () => {
      this.itemSelected = {};
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams: { id: null },
          queryParamsHandling: 'merge'
        });
    }

    this.postService.updatePost(item.id, item)
      .subscribe((res: any) => {
        if (isBack && callback) {
          callback();
        }
      }, err => {
      });
  }
}
