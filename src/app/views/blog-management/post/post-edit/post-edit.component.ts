import { ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Post } from '@app/_models/post';
import { EventEmitter } from '@angular/core';
import { POST_STATUS, POST_TYPE } from '@app/_shares/enum';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '@app/_services/category.service';
import { FileService } from '@app/_services/file.service';
import { PostService } from '@app/_services/post.service';
import { TagService } from '@app/_services/tag.service';
import { compareWithFunc, showNoti } from '@app/_shares/common';
import { TagModel } from 'ngx-chips/core/accessor';

@Component({
  selector: 'post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['../post-list/post-list.component.scss', './post-edit.component.scss']
})
export class PostEditComponent implements OnInit, OnDestroy {

  @Input() itemSelected = {} as any;
  @Output() save: EventEmitter<Post> = new EventEmitter<Post>();

  // old
  s;
  isLoadingResults = false;
  isSplitHorizontal = false;
  elem;
  POST_TYPE = POST_TYPE;
  listPostType = [
    POST_TYPE.GHOST_EDITOR,
    POST_TYPE.MARKDOWN
  ];
  listPermisson = [
    POST_STATUS.PUBLIC,
    POST_STATUS.PRIVATE
  ];
  listCategory = [];
  listTag = [];
  POST_STATUS = POST_STATUS;
  listFileOnServer = [];
  compareWithFunc = compareWithFunc;
  unSave = true;
  oldObject;

  constructor(
    @Inject(DOCUMENT) private document,
    private postService: PostService,
    private tagService: TagService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fileService: FileService) { }

  ngOnInit(): void {
    this.elem = document.getElementById('edit-post-container');

    this.getCategories();
    this.getTags();
    this.fileService.getMyFile({
      type: 'Image'
    }).subscribe((res: any) => {
      this.listFileOnServer = res;
    }, err => {
      showNoti('Get list file error. ' + err, 'danger');
    });
    this.oldObject = JSON.stringify(this.itemSelected);
    window.onbeforeunload = () => this.ngOnDestroy();
    this.unSave = true;
  }

  ngOnDestroy(): void {
    const isChange = this.oldObject !== JSON.stringify(this.itemSelected);;
    if (this.unSave && isChange) {
      const val = confirm(`Save change before leave?`);
      if (val) {
        this.save.emit(this.itemSelected);
      }
    }
  }

  getCategories() {
    this.categoryService.getCategorys()
      .subscribe(listCat => {
        this.listCategory = listCat;
      })
  }

  getTags() {
    this.tagService.getTags()
      .subscribe(listTag => {
        this.listTag = listTag;
      });
  }

  saveItem() {
    this.unSave = false;
    this.save.emit(this.itemSelected);
  }
  log() {
    console.log('this.itemSelected', this.itemSelected);
  }

  onSelectTag(e) {
    console.log(e);
  }
  handleAddNewTag(tag: TagModel) {

  }
  handleAddNewCategory(tag: TagModel) {

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
