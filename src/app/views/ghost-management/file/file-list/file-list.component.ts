import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from '@services/_index';
import { showNoti } from '@shares/common';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
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
    this.fileService.getMyFile().subscribe(files => {
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
        .subscribe((_: any) => {
          showNoti('File deleted!', 'success');
          this.getFiles();
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
