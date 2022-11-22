import { Component, Input, OnInit, Output } from '@angular/core';
import { MyFile } from '@app/_models/my-file';
import { Subscription } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { FileService } from '@app/_services/_index';
import { showNoti } from '@app/_shares/common';

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
  uploadSub: Subscription;

  constructor(
    private fileService: FileService,
  ) { }

  ngOnInit(): void {

  }

  onFileSelected(event) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('file', file);
      this.fileService.uploadFile(formData)
        .subscribe(file => {
          if (file) {
            showNoti(`Upload success`, 'success');
            this.uploadDone.emit(file);
          }
        }, (err) => {
          console.log(err);
          showNoti(`Upload fail. Error: ${err}`, 'danger');
        });

      // const upload$ = this.fileService.createObservableUploadFile(formData);

      // this.uploadSub = upload$.subscribe(event => {
      //   if (event.type == HttpEventType.UploadProgress) {
      //     this.uploadProgress = Math.round(100 * (event.loaded / event.total));
      //   }
      // })
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
