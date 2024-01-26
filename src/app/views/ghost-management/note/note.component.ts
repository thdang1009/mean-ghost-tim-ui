import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { showNoti } from '@shares/common';
import { Note } from '@models/_index';
import { NoteService } from '@services/_index';
import * as dateFns from 'date-fns';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from '@environments/environment';
const apiUrl = environment.apiUrl + '/v1/file';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  data: Note[] = [];
  isLoadingResults = true;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: false,
    height: 'auto',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: apiUrl + '/upload',

    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
    ]
  };

  debounceID = undefined;
  today = dateFns.startOfToday();
  searchDate = new UntypedFormControl(this.today);
  searchStatus = 'NONE';
  itemSelected = undefined;

  constructor(
    private noteService: NoteService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const id = Number(params.id);
      if (id) {
        this.noteService.getNote(id)
          .subscribe(res => {
            this.itemSelected = res;
          });
      } else {
        this.itemSelected = undefined;
        this.searchNote(id);
      }
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
        this.isLoadingResults = false;
      });
  }

  searchNote(id = undefined) {
    this._getMyNote(id);
  }

  isSecretHeader(header = '') {
    if (header.includes('**') || header.includes('***')) {
      return true;
    }
    return false;
  }

  guardSecretHeader() {
    const pw = prompt('Enter password for super secret note');
    if (pw !== '147239') {
      showNoti('Wrong password', 'danger');
      return false;
    }
    return true;
  }

  chooseThisItem(item) {
    if (this.isSecretHeader(item?.header)) {
      const pwValid = this.guardSecretHeader();
      if (!pwValid) {
        return;
      }
    }
    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { id: item.id },
        queryParamsHandling: 'merge',
        skipLocationChange: false
      });
  }

  _getMyNote(id = undefined) {
    const value = this.searchDate && this.searchDate.value || new Date();
    const fromDate = dateFns.startOfDay(value);
    const toDate = dateFns.endOfDay(value);
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
          const foundNote = res.filter(el => el.id === id)[0];
          if (this.isSecretHeader(foundNote?.header)) {
            const pwValid = this.guardSecretHeader();
            if (!pwValid) {
              return;
            }
          }
          this.itemSelected = foundNote;
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
    this.noteService.updateNote(id, item)
      .subscribe((res: any) => {
        if (index === -1) {
          this.searchNote();
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
    this.callDeleteNote(id);
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
          this.data = this.data.filter(el => el.id !== id);
          this.isLoadingResults = false;
        }, err => {
          this.isLoadingResults = false;
        });
    }
  }
  // async drop(event: CdkDragDrop<string[]>) {
  //   const result = await this.sort(event.previousIndex, event.currentIndex);
  //   if (result === 'fail') {
  //     showNoti('Sort Fail!', 'danger');
  //     return;
  //   }
  //   moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  // }
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
