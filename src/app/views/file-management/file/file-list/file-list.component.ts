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
  index = 0;
  listAll = [];
  files = [];
  constructor(
    private fileService: FileService,
    private router: Router) { }

  ngOnInit(): void {
    this.getFiles();
  }

  resetParams() {
    this.index = 0;
    this.listAll.length = 0;
    this.files.length = 0;
  }

  getFiles() {
    this.resetParams();
    this.fileService.getAllFile().subscribe(files => {
      this.listAll = files;
      this.files = this.getMoreFiles();
    }, (err) => {
      console.log(err);
      showNoti(`Get file fail!`, 'danger');
    });
  }
  getMoreFiles(pageSize = 5) {
    const tempArray = [];
    for (let i = 0; i < pageSize; i++, this.index++) {
      if (this.listAll[this.index])
        tempArray.push(this.listAll[this.index]);
    }
    return tempArray;
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
      ['admin/file/file'],
      {
        queryParams: { id: file._id }
      });
  }
  uploadNewFile() {
    this.router.navigate(
      ['admin/file/file'],
      {
      });
  }
  showMore() {
    this.files = [...this.files, ...this.getMoreFiles()];
  }
}
