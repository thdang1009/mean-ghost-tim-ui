import { ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Post } from '@app/_models/post';
import { EventEmitter } from '@angular/core';
import { POST_STATUS, POST_TYPE } from '@app/_shares/enum';
import { DOCUMENT } from '@angular/common';
import { TagService, CategoryService, FileService } from '@app/_services/_index';
import { compareWithFunc, showNoti } from '@app/_shares/common';
import { Observable } from 'rxjs/Observable';
export interface PostSaveWrapper {
  item: Post;
  isBack: boolean;
}

@Component({
  selector: 'post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['../post-list/post-list.component.scss']
})
export class PostEditComponent implements OnInit, OnDestroy {

  @Input() itemSelected = {} as any;
  @Output() save: EventEmitter<PostSaveWrapper> = new EventEmitter<PostSaveWrapper>();

  // old
  s;
  isLoadingResults = false;
  isSplitHorizontal = false;
  elem;
  POST_TYPE = POST_TYPE;
  listPostType = [
    // POST_TYPE.GHOST_EDITOR,
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

  tagSelected = [];
  categorySelected = [];

  constructor(
    @Inject(DOCUMENT) private document,
    private tagService: TagService,
    private categoryService: CategoryService,
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

  saveOnly() {
    this.unSave = false;
    this.save.emit({ item: this.itemSelected, isBack: false });
  }

  saveAndBack() {
    this.unSave = false;
    this.save.emit({ item: this.itemSelected, isBack: true });
  }
  log() {
    console.log('this.itemSelected', this.itemSelected);
  }

  onSelectTag(e) {
    console.log(e);
  }
  handleAddNewTag = ({ value: newTagName }) => {
    // migrate from ngx-chips to mat-chip-grid:
    const foundInList = this.listTag.filter(el => el?.name?.toLowerCase() === newTagName.toLowerCase());
    const oldTag = (foundInList || [])[0];
    // chọn cái cũ thì có _id, tạo mới thì chỉ có mỗi name mà còn ko phải là object nữa
    const isOldTag = !!oldTag;
    if (isOldTag) {
      this.itemSelected.tags.push(oldTag);
      return;
    }
    this.tagService.createTagWithName(newTagName)
      .subscribe(newTagFromServer => {
        this.itemSelected.tags.push(newTagFromServer);
        this.getTags();
      }, error => {
        showNoti('Create tag fail ' + error, 'danger');
      });
  }
  handleAddNewCategory = ({ value: newCategoryName }) => {
    // migrate from ngx-chips to mat-chip-grid:
    const foundInList = this.listCategory.filter(el => el?.name?.toLowerCase() === newCategoryName.toLowerCase());
    const oldCategory = (foundInList || [])[0];
    // chọn cái cũ thì có _id, tạo mới thì chỉ có mỗi name mà còn ko phải là object nữa
    const isOld = !!oldCategory;
    if (isOld) {
      this.itemSelected.category.push(oldCategory);
      return;
    }
    this.categoryService.createCategoryWithName(newCategoryName)
      .subscribe(newCategoryFromServer => {
        this.itemSelected.category.push(newCategoryFromServer);
        this.getCategories();
      }, error => {
        showNoti('Create category fail ' + error, 'danger');
      });
  }

  public requestAutocompleteTags = (text: string): Observable<any> => {
    return this.tagService.getTags(text);
  }

  public asyncOnAdding = (name): Observable<any> => {
    const confirm = window.confirm(`Do you really want to add tag: "${name}"?`);
    if (!confirm) {
      return;
    }
    return this.tagService.createTagWithName(name);
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
  removeTag(removedTag) {
    const temp = this.itemSelected.tags.filter(tag => tag._id !== removedTag._id);
    this.itemSelected.tags = temp;
    return temp;
  }
  removeCategory(removedCategory) {
    const temp = this.itemSelected.category.filter(category => category._id !== removedCategory._id);
    this.itemSelected.category = temp;
    return temp;
  }
}
