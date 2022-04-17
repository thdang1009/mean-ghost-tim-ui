import { Component, Input, OnInit } from '@angular/core';

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
