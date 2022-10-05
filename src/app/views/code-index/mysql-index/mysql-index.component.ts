import { Component, OnInit } from '@angular/core';
import { PDF_ASSETS_PATH } from '@app/_shares/constant';

@Component({
  selector: 'mysql-index',
  templateUrl: './mysql-index.component.html',
  // styleUrls: ['./mysql-index.component.scss']
})
export class MysqlIndexComponent implements OnInit {
  pdfSrc = PDF_ASSETS_PATH + '/MySQLNotesForProfessionals.pdf';
  
  constructor() { }

  ngOnInit(): void {
  }

}
