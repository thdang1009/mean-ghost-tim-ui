import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { BookService } from '@services/_index';
import { Book } from '@models/_index';
import { ActivatedRoute, Router } from '@angular/router';
import { showNoti } from '@shares/common';
import * as dateFns from 'date-fns';

@Component({
  selector: 'book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  data: Book[] = [];
  isLoadingResults = true;

  debounceID = undefined;
  today = dateFns.startOfToday();
  searchDate = new UntypedFormControl(this.today);
  searchStatus = 'NONE';
  statusList = ['NONE', 'NOT_YET', 'DONE', 'TOMORROW'];
  itemSelected = undefined;

  constructor(
    private bookService: BookService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const id = Number(params.id);
      this.searchBook(id);
    });
  }

  addBook() {
    const sample: Book = {
      content: '',
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
      .subscribe((res: any) => {
        this.data = res;
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
    console.log('debug');
    item.content = item.content.trim();
    this.bookService.updateBook(id, item)
      .subscribe((res: any) => {
        if (index === -1) {
          this.searchBook();
        } else {
          this.data[index] = res;
        }
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
    this.callDeleteBook(id);
  }
  saveThenBack() {
    this.saveItem(this.itemSelected.id, this.itemSelected);
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
    const val = confirm(`Delete "${book.header}"?`);
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

  // handle open file
  openFile(){
    console.log('hell')
    document.getElementById('choose-file').click();
  }
  handle(e){
    console.log('Change input file')
  }
}
