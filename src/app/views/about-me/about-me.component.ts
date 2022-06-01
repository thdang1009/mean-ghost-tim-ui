import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit, AfterViewInit {
  @ViewChild('aboutMe') aboutMeElement: ElementRef;
  @ViewChild('services') servicesElement: ElementRef;
  @ViewChild('portfolio') portfolioElement: ElementRef;
  @ViewChild('contact') contactElement: ElementRef;
  @ViewChild('aboutMeContent') aboutMeContent: ElementRef;

  heights = [];
  yearOlds: number;
  currentActive: number = 0;
  debounceID = undefined;
  intervalID = undefined;
  arrString = [];

  indexInterval = 0;
  constructor() { }

  ngOnInit(): void {
    this.yearOlds = new Date().getFullYear() - 1996;
    this.intervalID = setInterval(_ => {
      this.indexInterval = (this.indexInterval + 1) % 4
    }, 1500);
    window.onbeforeunload = () => this.ngOnDestroy();
  }
  ngOnDestroy(): void {
    clearInterval(this.intervalID);
  }
  ngAfterViewInit(): void {
    this.heights = [
      0,
      this.aboutMeElement.nativeElement.offsetTop,
      this.servicesElement.nativeElement.offsetTop,
      this.portfolioElement.nativeElement.offsetTop,
      this.contactElement.nativeElement.offsetTop
    ];
    // console.log(this.heights);
  }
  scrollTo(s) {
    const element = document.getElementById(s);
    element.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
  downloadCV() {

  }
  hireMe() {

  }

  // @HostListener('window:scroll', ['$event'])
  checkOffsetTop(event) {
    // if (this.debounceID) {
    //   clearTimeout(this.debounceID);
    // }
    // this.debounceID = setTimeout(_ => {
    const val = this.aboutMeContent.nativeElement.scrollTop;
    console.log(this.heights, val);
    if (val >= this.heights[0] && val < this.heights[1]) {
      this.currentActive = 0;
    } else if (val >= this.heights[1] && val < this.heights[2]) {
      this.currentActive = 1;
    } else if (val >= this.heights[2] && val < this.heights[3]) {
      this.currentActive = 2;
    } else if (val >= this.heights[3]) {
      this.currentActive = 3;
    } else {
      this.currentActive = 0;
    }
    // }, 50);
  }

}
