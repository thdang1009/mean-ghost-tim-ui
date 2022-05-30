import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ghost-site-btn',
  templateUrl: './ghost-site-btn.component.html',
  styleUrls: ['./ghost-site-btn.component.css']
})
export class GhostSiteBtnComponent implements OnInit {
  @Input() link: string = '';
  @Input() type: typeBtn = 'btn';
  @Input() width: string = '';
  @Input() height: string = '';
  @Input() paddingLeft: string = '';
  @Input() boldText: boolean = true;
  @Input() active?: boolean = false;
  @Output() callback = new EventEmitter<boolean>();

  commonClass: string = `
  hover:no-underline
  focus:no-underline
  flex
  items-center
  justify-center
  btn-css
  transition
  whitespace-nowrap
  `

  linkClass: string = `
  hover:text-blue
  rounded-none`;

  btnClass: string = `
  bg-blue 
  text-white
  lift
  `;

  outlineClass: string = `
  bg-white
  !text-blue
  hover:text-blue
  lift
  rounded-[8px]
  border
  border-blue
  `;

  constructor() { }

  ngOnInit(): void {

  }
}

type typeBtn = 'btn' | 'link' | 'outline';

