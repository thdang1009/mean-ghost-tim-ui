import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ExampleText, ExampleText2 } from '@helpers/fake.data';
import { showNoti } from '@shares/common';
import { SAVED_TEXT, SAVED_TEXT_2 } from '@shares/constant';
import diff from 'diff-sequences';

@Component({
  selector: 'app-text-diff',
  templateUrl: './text-diff.component.html',
  styleUrls: ['./text-diff.component.scss']
})
export class TextDiffComponent implements OnInit, OnDestroy {
  @ViewChild('text1') text1: ElementRef;
  @ViewChild('text2') text2: ElementRef;

  @ViewChild('backdrop1') backdrop1: ElementRef;
  @ViewChild('backdrop2') backdrop2: ElementRef;

  public 1: any;
  public visibleData1: any;
  public highlights1: any;
  public visibleData2: any;
  public highlights2: any;
  isLoadingResults = false;
  constructor() { }

  ngOnInit(): void {

    this.visibleData1 = localStorage.getItem(SAVED_TEXT) || ExampleText;
    this.visibleData2 = localStorage.getItem(SAVED_TEXT_2) || ExampleText2;

    window.onbeforeunload = () => this.ngOnDestroy();
  }

  ngOnDestroy(): void {
    try {
      localStorage.setItem(SAVED_TEXT, this.visibleData1);
      localStorage.setItem(SAVED_TEXT_2, this.visibleData2);
    } catch (e) {
      showNoti('Lỗi lưu local: ' + e, 'danger');
    }
  }
  diffItem(a, b) {

    const isCommon = (_aIndex, _bIndex) => a[_aIndex] === b[_bIndex];

    let aIndex = 0;
    let bIndex = 0;
    const array = [];
    const foundSubsequence = (nCommon, aCommon, bCommon) => {
      if (aIndex !== aCommon) {
        array.push([-1, a.slice(aIndex, aCommon)]); // delete is -1
      }
      if (bIndex !== bCommon) {
        array.push([1, b.slice(bIndex, bCommon)]); // insert is 1
      }

      aIndex = aCommon + nCommon; // number of characters compared in a
      bIndex = bCommon + nCommon; // number of characters compared in b
      array.push([0, a.slice(aCommon, aIndex)]); // common is 0
    };

    diff(a.length, b.length, isCommon, foundSubsequence);

    // After the last common subsequence, push remaining change items.
    if (aIndex !== a.length) {
      array.push([-1, a.slice(aIndex)]);
    }
    if (bIndex !== b.length) {
      array.push([1, b.slice(bIndex)]);
    }

    return array;
  }

  findDiff() {
    const a = this.visibleData1;
    const b = this.visibleData2;

    const result = this.diffItem(a, b);
    let content1 = '',
        content2 = '';
    const formatAddContent = (add) => {
      return `<mark>${add}</mark>`;
    };
    const formatEditContent = (edit) => {
      return `<mark-as-edit>${edit}</mark-as-edit>`;
    }
    const formatContent = (content) => {
      return `${content}`;
    }
    // console.log(result);
    result.forEach(([flag, content]) => {
      if (flag === -1) {
        content1 += formatAddContent(content);
      } else if (flag === 1) {
        content2 += formatAddContent(content);
      } else if (flag === 0) {
        content1 += formatContent(content);
        content2 += formatContent(content);
      }
    });
    this.highlights1 = this.applyHighlights(content1);
    this.highlights2 = this.applyHighlights(content2);
    console.log(this.highlights1);
    console.log(this.highlights2);
  }
  applyHighlights(text) {
    return text
  }
  handleInput1() {
    // change it to angular and element is 1
    // var text = $textarea.val();
    // var highlightedText = applyHighlights(text);
    // $highlights.html(highlightedText);
  }
  handleInput2() {
    // change it to angular and element is 2
    // var text = $textarea.val();
    // var highlightedText = applyHighlights(text);
    // $highlights.html(highlightedText);
  }
  onScroll1(e) {
    // change it to angular and element is 1
    const scrollTop = this.text1.nativeElement.scrollTop;
    this.backdrop1.nativeElement.scrollTop = scrollTop ;
  }
  onScroll2(e) {
    // change it to angular and element is 2
    const scrollTop = this.text2.nativeElement.scrollTop;
    this.backdrop2.nativeElement.scrollTop = scrollTop;
  }
}
