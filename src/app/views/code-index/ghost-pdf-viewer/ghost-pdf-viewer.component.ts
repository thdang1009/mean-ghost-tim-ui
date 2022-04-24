import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { SAVED_PDF_PAGE } from '@app/_shares/constant';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

/*
  - Add loading process
  - Add popup help: lên đầu trang, search, v.v...
*/


@Component({
  selector: 'ghost-pdf-viewer',
  templateUrl: './ghost-pdf-viewer.component.html',
  styleUrls: ['./ghost-pdf-viewer.component.css']
})
export class GhostPdfViewerComponent implements OnInit, OnDestroy {
  @ViewChild('pdf') pdf: PdfViewerComponent;
  @Input() src: string;
  @Input() pdfFileName: string;
  pdfSrc;
  currentPage = 1;
  key = '';
  savedPage;
  constructor() { }

  ngOnInit(): void {
    this.pdfSrc = this.src;
    this.key = SAVED_PDF_PAGE + '_' + this.pdfFileName;
    this.savedPage = Number(localStorage.getItem(this.key));
    console.log(typeof this.savedPage, typeof this.key);
    if (this.savedPage) {
      // this.currentPage = Number(this.savedPage);
      setTimeout(_ => {
        this.pdf.pdfViewer.scrollPageIntoView({
          pageNumber: this.savedPage
        });
      }, 1000);
    }
  }
  pagechanging(e: CustomEvent) {
    // this.currentPage = e['pageNumber']; // the page variable
    // console.log(this.currentPage);
  }

  ngOnDestroy(): void {
    console.log(this.currentPage);
    localStorage.setItem(this.key, '' + this.currentPage);
  }
  buttonClick() {
    setTimeout(_ => {
      this.pdf.pdfViewer.scrollPageIntoView({
        pageNumber: 1
      });
    }, 0);
  }
}
