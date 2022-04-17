import { Component, OnInit } from '@angular/core';
import { PDF_ASSETS_PATH } from '@app/_shares/constant';

@Component({
  selector: 'js-index',
  templateUrl: './js-index.component.html',
  styleUrls: ['./js-index.component.css']
})
export class JsIndexComponent implements OnInit {
  pdfSrc = PDF_ASSETS_PATH + '/JavaScriptNotesForProfessionals.pdf';

  constructor() { }

  ngOnInit(): void {
  }

}
