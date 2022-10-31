import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { showNoti } from '@app/_shares/common';
import { PDF_OBJ } from '@shares/constant';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

/*
  - Add loading process => done
  - Add popup help: lên đầu trang, search, v.v... => done, nếu được thì
    improve cái search in pdf cho nhiều kết quả chứ đừn đứng yên 1 chỗ như thế
  - Tính năng mới nhất sẽ là cho phép user (đã đăng nhập) truy cập vào link three-book để upload 3 quyển sách
  - Kéo thả file (tất nhiên là pdf)
  - Upload file đó lên server
  - Mở lên đọc (tất nhiên là từ server), lưu lại last page visit
  - Có chức năng bỏ sách (đọc dở quá ko thèm đọc nữa), và chức năng done
    => lưu lại danh sách sách đã đọc => đưa vào admin site
*/


@Component({
  selector: 'app-ghost-pdf-viewer',
  templateUrl: './ghost-pdf-viewer.component.html',
  styleUrls: ['./ghost-pdf-viewer.component.scss']
})
export class GhostPdfViewerComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('pdf') pdf: PdfViewerComponent;
  @Input() src: string;
  @Input() pdfFileName: string;
  pdfSrc;
  currentPage = 1;
  key = '';
  savedPage;
  loadingOpacity = 1;
  isLoading = true;
  bookmarks = new Map();
  elem;
  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.pdfSrc = this.src;
    this.key = PDF_OBJ + '_' + this.pdfFileName;
    this.savedPage = Number(localStorage.getItem(this.key));
    const arr = (localStorage.getItem(this.key + '_bookmarks') || '').split(',').map(el => +el);
    this.bookmarks = new Map(arr.map(el => [el, true]));
    // console.log(typeof this.savedPage, typeof this.key);
    // const element: HTMLElement = this.element.nativeElement;
    // const loadingOverlay = element.getElementsByClassName('overlay')[0];
    let count = 0;

    const intervalId = setInterval(_ => {
      const time = 80;
      const delta = 1 / time;
      this.loadingOpacity = 1 - count * delta;
      ++count;
      // loadingOverlay.setAttribute('style', {});
      if (count > time) {
        clearInterval(intervalId);
      }
    }, 100);
    window.onbeforeunload = () => this.ngOnDestroy();
  }

  ngAfterViewInit(): void {
    setTimeout(_ => {
      this.activeRoute.queryParams.subscribe(queryParams => {
        this.search(queryParams['searchInPDF']);
      });
    }, 4000);
  }

  pagechanging(e: CustomEvent) {
    // this.currentPage = e['pageNumber']; // the page variable
    // console.log(this.currentPage);
  }

  parseSavedObject(objString) {

  }

  createSavedObject() {
    const obj = {};
    return JSON.stringify(obj);
  }

  ngOnDestroy(): void {
    // console.log(this.currentPage);
    const objSaved = this.createSavedObject();
    localStorage.setItem(this.key, '' + this.currentPage);
    localStorage.setItem(this.key + '_bookmarks', Array.from(this.bookmarks.keys()).join());
  }
  scrollToTop() {
    setTimeout(_ => {
      this.pdf.pdfViewer.scrollPageIntoView({
        pageNumber: 2
      });
    }, 0);
  }
  scrollToPreviousBookmark() {
    const curPage = this.currentPage;
    const findPreviousBookmark = (last, cur) => {
      const getThisValue = cur < curPage && cur >= last
      return getThisValue ? cur : last;
    }
    const arr = Array.from(this.bookmarks.keys());
    const min = Math.min(...arr);
    const pageTarget = arr.reduce(findPreviousBookmark, min);
    // console.log('goto ' + pageTarget, arr);
    setTimeout(_ => {
      this.pdf.pdfViewer.scrollPageIntoView({
        pageNumber: pageTarget
      });
    }, 0);
  }
  scrollToNextBookmark() {
    const curPage = this.currentPage;
    const findNextBookmark = (last, cur) => {
      const getThisValue = cur > curPage && cur <= last
      return getThisValue ? cur : last;
    }
    const arr = Array.from(this.bookmarks.keys());
    const max = Math.max(...arr);
    const pageTarget = arr.reduce(findNextBookmark, max);
    // console.log('goto ' + pageTarget, arr);
    setTimeout(_ => {
      this.pdf.pdfViewer.scrollPageIntoView({
        pageNumber: pageTarget
      });
    }, 0);
  }
  toggleBookmark() {
    const curPage = this.currentPage;
    if (this.bookmarks.has(curPage)) {
      this.removeBookmark(curPage);
    } else {
      this.bookmarkThis(curPage);
    }
  }
  bookmarkThis(page) {
    this.bookmarks.set(page, true);
    showNoti(`Bookmarked page ${this.currentPage}`, 'info');
    // update style of button
  }
  removeBookmark(page) {
    this.bookmarks.delete(page);
    showNoti(`Remove bookmark at page ${this.currentPage}`, 'info');
    // update style of button
  }
  openFullscreen() {
    if (!this.elem) {
      this.elem = document.getElementById('view-port-to-zoom');
    }
    const isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null);
    this.elem = document.documentElement;

    if (!isInFullScreen) {
      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen();
      } else if (this.elem.mozRequestFullScreen) {
        this.elem.mozRequestFullScreen();
      } else if (this.elem.webkitRequestFullScreen) {
        this.elem.webkitRequestFullScreen();
      } else if (this.elem.msRequestFullscreen) {
        this.elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document['webkitExitFullscreen']) {
        document['webkitExitFullscreen']();
      } else if (document['mozCancelFullScreen']) {
        document['mozCancelFullScreen']();
      } else if (document['msExitFullscreen']) {
        document['msExitFullscreen']();
      }
    }
  }
  keepExpand() {

  }
  loadComplete() {
    showNoti('Document successfully loaded!', 'success', 300);
    setTimeout(_ => {
      if (this.savedPage) {
        this.pdf.pdfViewer.scrollPageIntoView({
          pageNumber: this.savedPage
        });
      }
      this.isLoading = false;
    }, 300);
  }
  search(stringToSearch: string) {
    if (stringToSearch) {
      this.pdf.pdfFindController.executeCommand('find', {
        caseSensitive: false, findPrevious: undefined, highlightAll: true, phraseSearch: true, query: stringToSearch
      });
    }
  }
}
