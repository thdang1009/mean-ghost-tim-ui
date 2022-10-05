import { Component, OnInit } from '@angular/core';
import { PDF_ASSETS_PATH } from '@app/_shares/constant';

@Component({
  selector: 'android-index',
  templateUrl: './android-index.component.html',
  // styleUrls: ['./android-index.component.scss']
})
export class AndroidIndexComponent implements OnInit {
  pdfSrc = PDF_ASSETS_PATH + '/AndroidNotesForProfessionals.pdf';

  constructor() { }

  ngOnInit(): void {
  }

}
