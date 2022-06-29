import { Component, OnInit } from '@angular/core';
import { PDF_ASSETS_PATH } from '@app/_shares/constant';

@Component({
  selector: 'css-index',
  templateUrl: './css-index.component.html',
  // styleUrls: ['./css-index.component.css']
})
export class CssIndexComponent implements OnInit {
  pdfSrc = PDF_ASSETS_PATH + '/CSSNotesForProfessionals.pdf';

  constructor() { }

  ngOnInit(): void {
  }

}
