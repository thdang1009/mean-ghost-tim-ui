import { Component, OnInit } from '@angular/core';
import { PDF_ASSETS_PATH } from '@app/_shares/constant';

@Component({
  selector: 'markdown-index',
  templateUrl: './markdown-index.component.html',
  styleUrls: ['./markdown-index.component.scss']
})
export class MarkdownIndexComponent implements OnInit {
  pdfSrc = PDF_ASSETS_PATH + '/markdown.pdf';

  constructor() { }

  ngOnInit(): void {
  }

}
