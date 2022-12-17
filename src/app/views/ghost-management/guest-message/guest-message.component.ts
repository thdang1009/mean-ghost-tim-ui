import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { showNoti } from '@shares/common';
import { GuestMessage } from '@models/_index';
import { GuestMessageService } from '@services/_index';
import * as dateFns from 'date-fns';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { environment } from '@environments/environment';
const apiUrl = environment.apiUrl + '/v1/file';
@Component({
  selector: 'app-guest-message',
  templateUrl: './guest-message.component.html',
  styleUrls: ['./guest-message.component.scss']
})
export class GuestMessageComponent implements OnInit {

  data: GuestMessage[] = [];
  isLoadingResults = true;
  detailForm: UntypedFormGroup;

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
  statusList = ['NONE', 'NOT_YET', 'DONE', 'TOMORROW'];
  itemSelected = undefined;

  constructor(
    private guestMessageService: GuestMessageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef,
    private formBuilder: UntypedFormBuilder
  ) { }

  ngOnInit() {
    this.searchGuestMessage();

    this.detailForm = this.formBuilder.group({
      id: [null],
      message: [null, Validators.required],
      name: [null, Validators.required],
      subject: [null, Validators.required],
      email: [null, Validators.required]
    });
  }

  searchGuestMessage() {
    this.getGuestMessage();
  }

  chooseThisItem(item) {
    this.initFormWithData(item);
    this.itemSelected = item;
  }

  initFormWithData(data = {} as any) {
    this.isLoadingResults = true;
    this.detailForm.patchValue(data);
    this.isLoadingResults = false;
  }

  getGuestMessage() {
    const req = {
    }
    this.isLoadingResults = true;
    this.guestMessageService.getGuestMessages(req)
      .subscribe((res: any) => {
        this.data = res;
        this.isLoadingResults = false;
      }, err => {
        this.isLoadingResults = false;
      });
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
  deleteGuestMessage(guestMessage) {
    const val = confirm(`Delete "${guestMessage.header}"?`);
    if (val) {
      this.callDeleteGuestMessage(guestMessage.id);
    }
  }
  callDeleteGuestMessage(id) {
    if (id) {
      this.isLoadingResults = true;
      this.guestMessageService.deleteGuestMessage(id)
        .subscribe((_: any) => {
          this.data = this.data.filter(el => el.id !== id);
          this.isLoadingResults = false;
        }, err => {
          this.isLoadingResults = false;
        });
    }
  }
}
