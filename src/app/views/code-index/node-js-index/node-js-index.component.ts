import { Component, OnInit } from '@angular/core';
import { PDF_ASSETS_PATH } from '@shares/constant';

@Component({
  selector: 'app-node-js-index',
  templateUrl: './node-js-index.component.html',
  // styleUrls: ['./node-js-index.component.css']
})
export class NodeJsIndexComponent implements OnInit {
  pdfSrc = PDF_ASSETS_PATH + '/NodeJSNotesForProfessionals.pdf';

  constructor() { }

  ngOnInit(): void {
  }

}
