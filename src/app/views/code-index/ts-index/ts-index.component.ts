import { Component, OnInit } from '@angular/core';
import { PDF_ASSETS_PATH } from '@app/_shares/constant';

@Component({
  selector: 'ts-index',
  templateUrl: './ts-index.component.html',
  // styleUrls: ['./ts-index.component.scss']
})
export class TsIndexComponent implements OnInit {
  pdfSrc = PDF_ASSETS_PATH + '/TypeScriptNotesForProfessionals.pdf';
  constructor() { }

  ngOnInit(): void {
  }

}
