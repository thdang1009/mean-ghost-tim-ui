import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BookService } from '@services/_index';
import { Book } from '@models/_index';
import { ActivatedRoute, Router } from '@angular/router';
import { compareWithFunc, showNoti } from '@shares/common';
import * as dateFns from 'date-fns';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '@environments/environment';
import { CONSTANT, LIST_TRUE_FALSE } from '@shares/constant';
import { BookPermission } from '@shares/enum';
import { FileService } from '@services/_index';
@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  detailForm: UntypedFormGroup;
  data: Book[] = [];
  isLoadingResults = true;
  savedFile: File = null;
  scoreValue = 0;
  listFileOnServer = [];
  listTrueFalse = LIST_TRUE_FALSE;

  debounceID = undefined;
  today = dateFns.startOfToday();
  searchDate = new UntypedFormControl(this.today);
  searchStatus = 'NONE';
  itemSelected = undefined;
  permissions = [
    BookPermission.PUBLIC,
    BookPermission.PROTECTED,
    BookPermission.PRIVATE,
    BookPermission.READONLY
  ];
  compareWithFunc = compareWithFunc;
  isUpdate = false;
  id = undefined;

  // file uploader
  apiUrl = environment.apiUrl + '/api/book/upload';
  public uploader: FileUploader = new FileUploader({
    url: this.apiUrl,
    itemAlias: 'file',
    authToken: `${localStorage.getItem(CONSTANT.TOKEN)}`
  });
  sliderControl = new FormControl(10);

  constructor(
    private bookService: BookService,
    private fileService: FileService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef,
    private formBuilder: UntypedFormBuilder
  ) { }

  ngOnInit() {
    this.detailForm = this.formBuilder.group({
      id: [null],
      title: [null, Validators.required],
      isDone: [null, Validators.required],
      slot: [null, Validators.required],
      url: [null, Validators.required],
      score: [null, Validators.required],
      permission: [null, Validators.required],
      description: [null],
    });
    this.activatedRoute.queryParams.subscribe(params => {
      const id = params.id;
      if (id) {
        this.bookService.getBook(id)
          .subscribe(res => {
            const url = (res.url || {} as any).id;
            const urlGet = (res.url || {} as any).urlGet;
            this.itemSelected = {
              ...res,
              urlGet: urlGet,
              url: url
            };
            this.initFormWithData(this.itemSelected);
            this.isUpdate = true;
          });
      } else {
        this.searchBook();
        this.isUpdate = false;
        this.itemSelected = undefined;
      }
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      showNoti('File successfully uploaded!', 'success');
    };
    this.sliderControl.valueChanges.subscribe(value => {
      console.log(value);
    });
    this.fileService.getMyFile({
      ext: '.pdf'
    }).subscribe((res: any) => {
      this.listFileOnServer = res;
    }, err => {
      showNoti('Get list file error. ' + err, 'danger');
    });

  }

  initFormWithData(data = {} as any) {
    this.detailForm.patchValue(data);
    this.isLoadingResults = false;
    this.scoreValue = data.score;
  }

  addBook() {
    this.isLoadingResults = true;
    const sample: Book = {
      slot: 1
    }
    this.bookService.addBook(sample)
      .subscribe((res: any) => {
        this.data.push(res);
        this.isLoadingResults = false;
        showNoti('Add empty book successfully!', 'success');
      }, err => {
        this.isLoadingResults = false;
      });
  }

  searchBook(id = undefined) {
    this._getMyBook(id);
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

  _getMyBook(id = undefined) {
    this.isLoadingResults = true;
    this.bookService.getBooks()
      .subscribe((res: Book[]) => {
        this.data = res.map(el => ({
          ...el,
          userDisplay: '' //this.userService.mapUserName(el.user)
        }));
        if (id) {
          this.itemSelected = res.filter(el => el.id === id)[0];
          this.ref.markForCheck();
        }
        this.isLoadingResults = false;
      }, err => {
        this.isLoadingResults = false;
      });
  }
  saveItem(id, item, index = -1) {
    this.bookService.updateBook(id, item)
      .subscribe((res: any) => {
      }, err => {
      });
  }
  saveThenBack(newBook) {
    this.saveItem(this.itemSelected.id, newBook);
    this.back();
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
  readThisBook() {
    const urlGet = this.itemSelected.urlGet;
    const title = this.itemSelected.title;
    this.router.navigate(
      ['../view-book'],
      {
        relativeTo: this.activatedRoute,
        queryParams: { link: urlGet, title: title },
        queryParamsHandling: 'merge'
      });
  }
  deleteBook(book) {
    const val = confirm(`Delete "${book.title}"?`);
    if (val) {
      this.callDeleteBook(book.id);
    }
  }
  callDeleteBook(id) {
    if (id) {
      this.isLoadingResults = true;
      this.bookService.deleteBook(id)
        .subscribe(({ success }: any) => {
          if (success) {
            this.data = this.data.filter(el => el.id !== id);
          }
          this.isLoadingResults = false;
        }, err => {
          this.isLoadingResults = false;
        });
    }
  }
  silderInput(value) {
    this.detailForm.patchValue({
      score: value
    })
  }
  onFormSubmit(newBook) {
    this.saveThenBack(newBook);
  }
  getListFileOnServer() {
    this.bookService.getBooks
  }
}
