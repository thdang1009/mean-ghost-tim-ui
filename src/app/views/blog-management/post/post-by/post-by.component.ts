import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '@services/_index';

@Component({
  selector: 'app-post-by',
  templateUrl: './post-by.component.html',
  styleUrls: ['./post-by.component.scss']
})
export class PostByComponent implements OnInit {
  posts;
  constructor(
    private postService: PostService,
    private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.queryParams
      .subscribe(params => {
        this.postService.getPublicPosts(params)
          .subscribe(posts => {
            this.posts = posts || [];
          });
      });
  }

}
