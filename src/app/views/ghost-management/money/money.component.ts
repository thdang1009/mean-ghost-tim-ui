import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.scss']
})
export class MoneyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // this.router.navigateByUrl('https://https://web.moneylover.me/');
  }

}
