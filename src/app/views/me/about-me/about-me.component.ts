import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { SocketioService } from '@app/_services/socketio.service';
import { GUEST_MESSAGE } from '@app/_shares/constant';
import { UserService } from '@services/_index';
import { showNoti } from '@shares/common';
@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit, AfterViewInit {
  @ViewChild('aboutMe') aboutMeElement: ElementRef;
  @ViewChild('services') servicesElement: ElementRef;
  @ViewChild('portfolio') portfolioElement: ElementRef;
  @ViewChild('contact') contactElement: ElementRef;
  @ViewChild('aboutMeContent') aboutMeContent: ElementRef;


  isRunning = false;
  contactForm: UntypedFormGroup;
  heights = [];
  yearOlds: number;
  currentActive = 0;
  debounceID = undefined;
  // intervalID = undefined;
  arrString = ['A Fullstack Web Engineer', 'A Javascript Lover', 'A Minimalist', 'A Book Reviewer'];

  indexInterval = 0;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private userService: UserService,
    private socketService: SocketioService) { }

  ngOnInit(): void {
    this.yearOlds = new Date().getFullYear() - 1996;
    // this.intervalID = setInterval(_ => {
    //   this.indexInterval = (this.indexInterval + 1) % 4
    // }, 1500);
    // window.onbeforeunload = () => this.ngOnDestroy();
    this.contactForm = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, Validators.required],
      subject: [null, Validators.required],
      message: [null, Validators.required],

    });
    // console.log(this.socketService.socket);
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
  sendMessageToMe(form: NgForm) {
    this.isRunning = true;
    this.userService.sendGuestMessage(form)
      .subscribe(res => {
        this.isRunning = false;
        if (res && res.id) {
          showNoti('Send success!', 'success');
        }
      }, (err) => {
        this.isRunning = false;
        showNoti('Send Fail! ' + err.error, 'danger');
      });
    // call api save guest message
  }
  scrollTo(s) {
    const element = document.getElementById(s);
    element.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
  downloadCV() {

  }
  hireMe() {

  }
  onMessageChange() {

  }

  // @HostListener('window:scroll', ['$event'])
  checkOffsetTop(event) {
    // if (this.debounceID) {
    //   clearTimeout(this.debounceID);
    // }
    // this.debounceID = setTimeout(_ => {
    const val = this.aboutMeContent.nativeElement.scrollTop;
    // console.log(this.heights, val);
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

  openAD() {
    window.open('https://ad.zalopay.vn', '_blank');
  }
  openMC() {
    window.open('https://mc.zalopay.vn', '_blank');
  }
}
