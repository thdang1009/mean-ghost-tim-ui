import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BookService, UserService } from '@services/_index';
import { Book } from '@models/_index';
import { ActivatedRoute, Router } from '@angular/router';
import { isValidFile, showNoti } from '@shares/common';
import * as dateFns from 'date-fns';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '@environments/environment';
import { CONSTANT } from '@app/_shares/constant';
import { BookPermission } from '@app/_shares/enum';
import { FileService } from '@app/_services/file.service';
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

  debounceID = undefined;
  today = dateFns.startOfToday();
  searchDate = new UntypedFormControl(this.today);
  searchStatus = 'NONE';
  statusList = ['NONE', 'NOT_YET', 'DONE', 'TOMORROW'];
  itemSelected = undefined;
  permissions = [
    BookPermission.PUBLIC,
    BookPermission.PROTECED,
    BookPermission.PRIVATE,
    BookPermission.READONLY
  ];
  compareWithFunc(a, b) {
    return a == b;
  }

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
    });
    this.activatedRoute.queryParams.subscribe(params => {
      const id = params.id;
      if (id) {
        this.bookService.getBook(id)
          .subscribe(res => {
            this.initFormWithData(res);
            this.itemSelected = res;
            this.isUpdate = true;
            this.id = id;
          });
      } else {
        this.searchBook();
        this.isUpdate = false;
        this.id = undefined;
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
        this.data.unshift(res);
        this.isLoadingResults = false;
      }, err => {
        // console.log(err);
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
    const value = this.searchDate && this.searchDate.value || new Date();
    const fromDate = dateFns.startOfDay(value);
    const toDate = dateFns.endOfDay(value);
    const req = {
      from: fromDate || undefined,
      to: toDate || undefined,
    }
    this.isLoadingResults = true;
    this.bookService.getMyBook()
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
        // if (index === -1) {
        //   this.searchBook();
        // } else {
        //   this.data[index] = res;
        // }
      }, err => {
      });
  }
  saveThenBack(newBook) {
    this.saveItem(this.id, newBook);
    // it could be trigger back first, but that ok
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
        .subscribe((_: any) => {
          this.data = this.data.filter(el => el.id !== id);
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
    this.bookService.getMyBook
  }
}
