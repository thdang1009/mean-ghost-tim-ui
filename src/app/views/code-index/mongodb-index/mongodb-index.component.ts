import { Component, OnInit } from '@angular/core';
import { PDF_ASSETS_PATH } from '@app/_shares/constant';

@Component({
  selector: 'mongodb-index',
  templateUrl: './mongodb-index.component.html',
  styleUrls: ['./mongodb-index.component.css']
})
export class MongodbIndexComponent implements OnInit {
  pdfSrc = PDF_ASSETS_PATH + '/MongoDBNotesForProfessionals.pdf';

  constructor() { }

  ngOnInit(): void {
  }

}
