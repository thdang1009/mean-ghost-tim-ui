import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pdf-control-panel',
  templateUrl: './pdf-control-panel.component.html',
  styleUrls: ['./pdf-control-panel.component.scss']
})
export class PdfControlPanelComponent implements OnInit {
  zoom = 100;
  zoomList = [
    25,
    50,
    75,
    100,
    125,
    150,
    200
  ];
  zoomListLength = this.zoomList.length;

  @Output() changePageValue = new EventEmitter<number>();
  @Output() changeZoomValue = new EventEmitter<number>();
  @Output() shakeThePdf = new EventEmitter<number>();
  @Input() totalPages = 0;
  @Input() currentPage = 0;
  @Input() linkPdf;

  idDebounceChangePages = undefined;
  constructor() { }

  ngOnInit(): void {
    this.linkPdf = String(this.linkPdf);
  }

  changeZoom() {
    this.changeZoomValue.emit(this.zoom);
  }

  changePage(val) {
    if (val < 1) {
      val = 1;
      this.shakeThePdf.emit();
    }
    if (val > this.totalPages) {
      val = this.totalPages;
      this.shakeThePdf.emit();
    }
    this.currentPage = val;
    this.changePageValue.emit(val);
  }

  zoomIn() {
    let index = this.zoomList.findIndex(x => x == this.zoom);
    if (index === this.zoomListLength - 1) {
      index = this.zoomListLength - 1;
    } else {
      index++;
    }
    this.zoom = this.zoomList[index];
    this.changeZoom();
  }

  zoomOut() {
    console.log(this.zoom);
    let index = this.zoomList.findIndex(x => x == this.zoom);
    if (index <= 0) {
      index = 0;
    } else {
      index--;
    }
    this.zoom = this.zoomList[index];
    this.changeZoomValue.emit(this.zoom);
    this.changeZoom();
  }

  debounceChangeCurrentPage() {
    if (this.idDebounceChangePages) {
      clearTimeout(this.idDebounceChangePages);
    }
    this.idDebounceChangePages = setTimeout(() => {
      if (this.currentPage < 1) {
        this.shakeThePdf.emit();
      }
      if (this.currentPage > this.totalPages) {
        this.shakeThePdf.emit();
      }
      this.changePageValue.emit(this.currentPage);
    }, 300);
  }

  download() {
    const filename = ((fileName) => new URL(fileName).pathname.split('/').pop())(this.linkPdf);
    fetch(this.linkPdf)
      .then(response => response.blob())
      .then(blob => {
        const blobURL = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = blobURL;
        a.style.display = 'none';

        if (filename && filename.length) a.download = filename;
        document.body.appendChild(a);
        a.click();
      })
      .catch(() => { });
  };
}
