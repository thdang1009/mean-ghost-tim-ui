import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '@app/_services/_index';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  ready = false;
  item;
  idDebounce = undefined;
  num = 0;
  count: Number = 0;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('ref');
    this.postService.getPost(id).subscribe(_ => {
      this.item = _;
      this.count = _.clapCount;
      this.ready = true;
    });
  }

  clapThisPost(e) {
    // make debounce
    this.num++;
    if (this.idDebounce) {
      clearTimeout(this.idDebounce);
    }
    this.idDebounce = setTimeout(() => {
      this.postService.clapPost(this.item, this.num)
        .subscribe(_ => {
          this.item = _;
          this.num = 0;
          this.count = _.clapCount;
          clearTimeout(this.idDebounce);
        });
    }, 500);
  }
  
  updateClap() {
    console.log("update");
  }

  removeClap() {
    console.log("remove");
  }
}
