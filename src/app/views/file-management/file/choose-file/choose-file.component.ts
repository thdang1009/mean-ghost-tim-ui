import { Component, Input, OnInit, Output } from '@angular/core';
import { MyFile } from '@app/_models/my-file';
import { Subscription } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { FileService } from '@app/_services/_index';
import { getRandomInt, showNoti } from '@app/_shares/common';

@Component({
  selector: 'choose-file',
  templateUrl: './choose-file.component.html',
  styleUrls: ['./choose-file.component.scss']
})
export class ChooseFileComponent implements OnInit {

  @Input()
  requiredFileType: string;

  @Output()
  uploadDone: EventEmitter<MyFile> = new EventEmitter();

  fileName = '';
  uploadProgress: number;
  randomNumber: number = 0;
  uploadSub: Subscription;
  isUploading = false;

  constructor(
    private fileService: FileService,
  ) { }

  ngOnInit(): void {

  }

  fakeProgessing() {
    const middle = getRandomInt(20, 80);
    const first = getRandomInt(1, middle);
    const second = getRandomInt(middle, 99);
    this.randomNumber = first;
    setTimeout(() => {
      this.randomNumber = second;
    }, 1000)
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.fakeProgessing();
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('file', file);
      this.isUploading = true;
      this.fileService.uploadFile(formData)
        .subscribe(file => {
          this.isUploading = false;
          if (file) {
            showNoti(`Upload success`, 'success');
            this.uploadDone.emit(file);
          }
        }, (err) => {
          this.isUploading = false;
          console.log(err);
          showNoti(`Upload fail. Error: ${err}`, 'danger');
        });
    }
  }
  
  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = null;
    this.uploadSub = null;
  }

}
