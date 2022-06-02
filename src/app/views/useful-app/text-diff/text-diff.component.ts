import { Component, OnInit } from '@angular/core';
import { ExampleText, ExampleText2 } from '@app/_helpers/fake.data';
import { showNoti } from '@app/_shares/common';
import { SAVED_TEXT, SAVED_TEXT_2 } from '@app/_shares/constant';
import diff from 'diff-sequences';

@Component({
  selector: 'text-diff',
  templateUrl: './text-diff.component.html',
  styleUrls: ['./text-diff.component.css']
})
export class TextDiffComponent implements OnInit {

  public visibleData: any;
  public visibleData2: any;
  isLoadingResults = false;
  constructor() { }

  ngOnInit(): void {
    
    this.visibleData = localStorage.getItem(SAVED_TEXT) || ExampleText;
    this.visibleData2 = localStorage.getItem(SAVED_TEXT_2) || ExampleText2;
  }

  ngOnDestroy(): void {
    try {
      localStorage.setItem(SAVED_TEXT, JSON.stringify(this.visibleData));
      localStorage.setItem(SAVED_TEXT_2, JSON.stringify(this.visibleData2));
    } catch (e) {
      showNoti('Lỗi lưu local: ' + e, 'danger');
    }
  }

  findDiff() {
    const a = this.visibleData;
    const b = this.visibleData2;

    let count = 0;
    function isCommon(aIndex, bIndex) {
      return a[aIndex] === b[bIndex];
    }
    function foundSubsequence(nCommon, aCommon, bCommon) {
      // see examples
      ++count;
      console.log(nCommon, a.slice(bCommon, bCommon + nCommon));
    }
    diff(a.length, b.length, isCommon, foundSubsequence);
  }
}
