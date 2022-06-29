import { Component, OnInit } from '@angular/core';
import { PDF_ASSETS_PATH } from '@app/_shares/constant';

@Component({
  selector: 'git-index',
  templateUrl: './git-index.component.html',
  // styleUrls: ['./git-index.component.css']
})
export class GitIndexComponent implements OnInit {
  pdfSrc = PDF_ASSETS_PATH + '/GitNotesForProfessionals.pdf';

  constructor() { }

  ngOnInit(): void {
  }

}
