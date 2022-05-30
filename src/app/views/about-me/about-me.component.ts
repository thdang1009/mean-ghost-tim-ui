import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css']
})
export class AboutMeComponent implements OnInit {
  yearOlds: number;
  constructor() { }

  ngOnInit(): void {
    this.yearOlds = new Date().getFullYear() - 1996;
  }
  scrollTo(s) {
    const element = document.getElementById(s);
    element.scrollIntoView({ block: 'start',  behavior: 'smooth' });
  }
  downloadCV() {

  }
  hireMe() {
    
  }
}
