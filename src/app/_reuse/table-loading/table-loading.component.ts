import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-loading',
  templateUrl: './table-loading.component.html',
  styleUrls: ['./table-loading.component.css']
})
export class TableLoadingComponent implements OnInit {
  @Input() size = 'sm';
  // height;
  loadingOpacity = 1;
  constructor() {
    // this.height = {
    //   'xl': 1, 
    //   'md': 2,
    //   'sm': 3,
    // }[this.size];
  }

  ngOnInit(): void {
    let count = 0;
    const intervalId = setInterval(_ => {
      this.loadingOpacity = 1 - count * 0.025;
      ++count;
      if (count > 40) {
        clearInterval(intervalId);
      }
    }, 100);
  }

}
