import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'list-badge',
  templateUrl: './list-badge.component.html',
  styleUrls: ['./list-badge.component.css']
})
export class ListBadgeComponent implements OnInit {

  @Input() myStyles;
  constructor() {

  }

  ngOnInit(): void {
    // console.log(this.myStyles);
    if (!this.myStyles) {
      this.myStyles = {
        'margin': 'auto',
        'padding': '5px',
        'text-align': 'center',
      }
    }
  }

}
