import { Component, OnInit } from '@angular/core';
import { PDF_ASSETS_PATH } from '@shares/constant';

@Component({
  selector: 'app-html-index',
  templateUrl: './html-index.component.html',
  // styleUrls: ['./html-index.component.css']
})
export class HtmlIndexComponent implements OnInit {
  pdfSrc = PDF_ASSETS_PATH + '/HTML5NotesForProfessionals.pdf';

  constructor() { }

  ngOnInit(): void {
  }

}
