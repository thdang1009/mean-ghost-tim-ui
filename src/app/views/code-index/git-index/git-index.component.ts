import { Component, OnInit } from '@angular/core';
import { PDF_ASSETS_PATH } from '@shares/constant';

@Component({
  selector: 'app-git-index',
  templateUrl: './git-index.component.html',
  // styleUrls: ['./git-index.component.css']
})
export class GitIndexComponent implements OnInit {
  pdfSrc = PDF_ASSETS_PATH + '/GitNotesForProfessionals.pdf';

  constructor() { }

  ngOnInit(): void {
  }

}
