import { Component, OnInit } from '@angular/core';
import { PDF_ASSETS_PATH } from '@shares/constant';

@Component({
  selector: 'app-css-index',
  templateUrl: './css-index.component.html',
  // styleUrls: ['./css-index.component.css']
})
export class CssIndexComponent implements OnInit {
  pdfSrc = PDF_ASSETS_PATH + '/CSSNotesForProfessionals.pdf';

  constructor() { }

  ngOnInit(): void {
  }

}
