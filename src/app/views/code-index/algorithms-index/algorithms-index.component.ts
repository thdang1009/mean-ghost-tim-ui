import { Component, OnInit } from '@angular/core';
import { PDF_ASSETS_PATH } from '@app/_shares/constant';

@Component({
  selector: 'algorithms-index',
  templateUrl: './algorithms-index.component.html',
  // styleUrls: ['./algorithms-index.component.scss']
})
export class AlgorithmsIndexComponent implements OnInit {
  pdfSrc = PDF_ASSETS_PATH + '/AlgorithmsNotesForProfessionals.pdf';

  constructor() { }

  ngOnInit(): void {
  }

}
