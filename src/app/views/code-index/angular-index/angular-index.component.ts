import { Component, OnInit } from '@angular/core';
import { PDF_ASSETS_PATH } from '@shares/constant';

@Component({
  selector: 'app-angular-index',
  templateUrl: './angular-index.component.html',
  // styleUrls: ['./angular-index.component.css']
})
export class AngularIndexComponent implements OnInit {
  pdfSrc = PDF_ASSETS_PATH + '/Angular2NotesForProfessionals.pdf';

  constructor() { }

  ngOnInit(): void {
  }

}
