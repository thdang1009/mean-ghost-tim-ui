import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from '@services/_index';
import { showNoti } from '@shares/common';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html'
})
export class FileListComponent implements OnInit {


  files = [];
  constructor(
    private fileService: FileService,
    private router: Router) { }

  ngOnInit(): void {
    this.getFiles();
  }
  getFiles() {
    this.fileService.getAllFile().subscribe(files => {
      this.files = files;
    }, (err) => {
      console.log(err);
      showNoti(`Get file fail!`, 'danger');
    });
  }
  delete(id) {
    if (!id) {
      return;
    }
    if (id) {
      this.fileService.deleteFile(id)
        .subscribe((res: any) => {
          if (res.success) {
            showNoti('File deleted!', 'success');
            this.getFiles();
          }
        }, err => {
        });
    }
  }
  deleteItem(item) {
    const val = confirm(`Delete "${item.originName}"?`);
    if (val) {
      this.delete(item.id);
    }
  }
  edit(file) {
    if (!file) {
      return;
    }
    this.router.navigate(
      ['admin/tool/file'],
      {
        queryParams: { id: file._id }
      });
  }
}
