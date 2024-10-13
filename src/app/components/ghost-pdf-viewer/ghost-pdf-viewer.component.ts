import { AfterViewInit, Component, DoCheck, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ReadingInfoService } from '@services/reading-info/reading-info.service';
import { showNoti } from '@shares/common';
import { PDF_OBJ } from '@shares/constant';
import { PDFDocumentProxy, PdfViewerComponent } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-ghost-pdf-viewer',
  templateUrl: './ghost-pdf-viewer.component.html',
  styleUrls: ['./ghost-pdf-viewer.component.scss']
})
export class GhostPdfViewerComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('pdf') pdf: PdfViewerComponent;
  @Input() src: string;
  @Input() pdfFileName: string;
  @Input() isAdminView: boolean = false;

  // pdf var
  pdfSrc;
  currentPage = 1;
  totalPages = 0;
  zoom = 1;
  moveWrongPage = false;
  urlDoc: any;
  // end pdf var

  key = '';
  savedPage;
  loadingOpacity = 1;
  isLoading = true;
  bookmarks = new Map();
  bigPageMode = false;
  elem;
  pdfQuery = '';

  constructor(
    private activeRoute: ActivatedRoute,
    private readingInfoService: ReadingInfoService,
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.pdfSrc = this.src;
    const type = this.getTypeFromUrl(this.src);
    this.urlDoc = this.cleanUrl(this.src, type);

    this.key = PDF_OBJ + '_' + this.pdfFileName;
    this.savedPage = Number(localStorage.getItem(this.key));
    const arr = (localStorage.getItem(this.key + '_bookmarks') || '').split(',').map(el => +el);
    this.bookmarks = new Map(arr.map(el => [el, true]));
    let count = 0;

    const intervalId = setInterval(_ => {
      const time = 400;
      const delta = 1 / time;
      this.loadingOpacity = 1 - count * delta;
      ++count;
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
    }, 3000);
  }

  turnOnbigPageMode() {
    this.bigPageMode = true;
  }

  turnOffbigPageMode() {
    this.bigPageMode = false;
  }

  pagechanging(e: CustomEvent) {
    // TODO document why this method 'pagechanging' is empty
  }
  createSavedObject() {
    const obj = {};
    return JSON.stringify(obj);
  }

  ngOnDestroy(): void {
    localStorage.setItem(this.key, '' + this.currentPage);
    localStorage.setItem(this.key + '_bookmarks', Array.from(this.bookmarks.keys()).join());

    const objectSync = {};
    objectSync[this.key] = '' + this.currentPage;
    objectSync[this.key + '_bookmarks'] = Array.from(this.bookmarks.keys()).join();
    this.readingInfoService.readtimeUpdateReadingInfo(objectSync);
    showNoti('Your reading progess is saved', 'info');
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

    if (!pageTarget || pageTarget === curPage) {
      showNoti(`Not found! Can't go to previous bookmark`, 'warning');
      return;
    }

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

    if (!pageTarget || pageTarget === curPage) {
      showNoti('Not found! Can\'t go to next bookmark', 'warning');
      return;
    }

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
  }

  removeBookmark(page) {
    this.bookmarks.delete(page);
    showNoti(`Remove bookmark at page ${this.currentPage}`, 'info');
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
    // TODO document why this method 'keepExpand' is empty
  }

  cleanUrl(url = '.', type = undefined): SafeResourceUrl {
    if (!type) {
      type = this.getTypeFromUrl(url);
    }
    return type !== 'pdf' ?
      this.sanitizer.bypassSecurityTrustResourceUrl(`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`)
      :
      url;
  }

  getTypeFromUrl(url = '.?') {
    let arr;
    if (url.includes('?')) {
      arr = url.split('?')[0].split('.');
    } else {
      arr = url.split('.');
    }
    return arr[arr.length - 1];
  }

  loadComplete(pdf: PDFDocumentProxy) {
    setTimeout(_ => {
      this.isLoading = false;

      this.totalPages = pdf.numPages;

      const pdfViewer = document.getElementsByTagName('pdf-viewer')[0];
      const pdfViewerWidth = pdfViewer['offsetWidth'];

      const textLayers = document.getElementsByClassName('textLayer');
      let isBigger = false;
      Array.from(textLayers).forEach(textLayer => {
        if (textLayer['offsetWidth'] > pdfViewerWidth) {
          isBigger = true;
        }
      });

      if (this.savedPage) {
        this.pdf.pdfViewer.scrollPageIntoView({
          pageNumber: this.savedPage
        });
      }
    }, 300);
  }

  search(newQuery: string = '') {
    if (!newQuery) {
      return;
    }
    const isNewSearch = newQuery !== this.pdfQuery;
    const type = isNewSearch ? '' : 'again';
    this.pdfQuery = newQuery;

    this.pdf.eventBus.dispatch('find', {
      query: this.pdfQuery,
      type: type,
      caseSensitive: false,
      highlightAll: true,
      phraseSearch: true,
      findPrevious: isNewSearch,
    });
  }

  // pdf control panel
  changePageValue(e) {
    this.currentPage = e;
  }

  changeZoomValue(e) {
    this.zoom = e / 100;
  }

  shakeThePdf(_) {
    this.moveWrongPage = true;
    setTimeout(() => {
      this.moveWrongPage = false;
    }, 500)
  }
}
