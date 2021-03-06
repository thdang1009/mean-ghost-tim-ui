import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.pdfSrc = this.src;
    this.key = PDF_OBJ + '_' + this.pdfFileName;
    this.savedPage = Number(localStorage.getItem(this.key));
    // console.log(typeof this.savedPage, typeof this.key);
    // const element: HTMLElement = this.element.nativeElement;
    // const loadingOverlay = element.getElementsByClassName('overlay')[0];
    let count = 0;

    const intervalId = setInterval(_ => {
      this.loadingOpacity = 1 - count * 0.025;
      ++count;
      // loadingOverlay.setAttribute('style', {});
      if (count > 40) { // mất khoảng 4s để load all 1 tài liệu 400 pages
        clearInterval(intervalId);
        if (this.savedPage) {
          this.pdf.pdfViewer.scrollPageIntoView({
            pageNumber: this.savedPage
          });
        }
      }
    }, 100);

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
  }
  buttonClick() {
    setTimeout(_ => {
      this.pdf.pdfViewer.scrollPageIntoView({
        pageNumber: 1
      });
    }, 0);
  }
  loadComplete() {
    console.log('load complete!');
  }
  search(stringToSearch: string) {
    if (stringToSearch) {
      this.pdf.pdfFindController.executeCommand('find', {
        caseSensitive: false, findPrevious: undefined, highlightAll: true, phraseSearch: true, query: stringToSearch
      });
    }
  }
}
