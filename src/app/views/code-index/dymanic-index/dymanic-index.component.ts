import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PDF_ASSETS_PATH } from '@app/_shares/constant';
import { mapResourceName } from '../../../_shares/common';
export interface FePDFInfo {
  src: string,
  fileName: string;
}

@Component({
  selector: 'dymanic-index',
  templateUrl: './dymanic-index.component.html',
  styleUrls: ['./dymanic-index.component.scss']
})
export class DymanicIndexComponent implements OnInit {
  pdfSrc;
  pdfFileName;
  isReady = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const path = this.route.snapshot.url.join('');
    const info: FePDFInfo = mapResourceName(path);
    this.pdfSrc = PDF_ASSETS_PATH + info.src;
    this.pdfFileName = info.fileName;
  }

}
