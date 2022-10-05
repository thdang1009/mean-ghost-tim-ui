import { Component, OnInit } from '@angular/core';
import { PDF_ASSETS_PATH } from '@app/_shares/constant';

@Component({
  selector: 'react-native-index',
  templateUrl: './react-native-index.component.html',
  // styleUrls: ['./react-native-index.component.scss']
})
export class ReactNativeIndexComponent implements OnInit {
  pdfSrc = PDF_ASSETS_PATH + '/ReactNativeNotesForProfessionals.pdf';

  constructor() { }

  ngOnInit(): void {
  }

}
