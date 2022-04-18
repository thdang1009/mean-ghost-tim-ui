import { Component, OnInit } from '@angular/core';
import { PDF_ASSETS_PATH } from '@app/_shares/constant';

@Component({
  selector: 'angular-index',
  templateUrl: './angular-index.component.html',
  styleUrls: ['./angular-index.component.css']
})
export class AngularIndexComponent implements OnInit {
  pdfSrc = PDF_ASSETS_PATH + '/Angular2NotesForProfessionals.pdf';

  constructor() { }

  ngOnInit(): void {
  }

}
