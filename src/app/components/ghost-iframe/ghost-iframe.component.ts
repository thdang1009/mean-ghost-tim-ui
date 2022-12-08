import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ghost-iframe',
  templateUrl: './ghost-iframe.component.html',
  styleUrls: ['./ghost-iframe.component.scss']
})
export class GhostIframeComponent implements OnInit {

  @Input() src: any;
  @Input() allowFullscreen = false;
  @Input() title: string;

  formattedSrc = '';

  referrerpolicy = 'no-referrer';
  constructor() {
  }
  ngOnInit(): void {
  }
  open() {
  }
}
