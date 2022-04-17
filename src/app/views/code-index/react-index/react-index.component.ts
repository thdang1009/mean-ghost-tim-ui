import { Component, OnInit } from '@angular/core';
import { PDF_ASSETS_PATH } from '@app/_shares/constant';

@Component({
  selector: 'react-index',
  templateUrl: './react-index.component.html',
  styleUrls: ['./react-index.component.css']
})
export class ReactIndexComponent implements OnInit {
  pdfSrc = PDF_ASSETS_PATH + '/ReactJSNotesForProfessionals.pdf';

  constructor() { }

  ngOnInit(): void {
  }

}
