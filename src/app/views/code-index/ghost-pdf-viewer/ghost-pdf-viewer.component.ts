import { Component, Input, OnInit } from '@angular/core';

/*
  - Add loading process
  - Add popup help: lên đầu trang, search, v.v...
*/


@Component({
  selector: 'ghost-pdf-viewer',
  templateUrl: './ghost-pdf-viewer.component.html',
  styleUrls: ['./ghost-pdf-viewer.component.css']
})
export class GhostPdfViewerComponent implements OnInit {

  @Input() src: string;
  pdfSrc;
  constructor() { }

  ngOnInit(): void {
    this.pdfSrc = this.src;
  }

}
