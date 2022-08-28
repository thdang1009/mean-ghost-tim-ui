import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '@app/_services/category.service';
import { TagService } from '@app/_services/tag.service';
import { AuthService, HomeService, PostService } from '@services/_index';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLogined = false;
  isLoadingResults = true;
  thisYear = (new Date).getFullYear();
  posts = [];
  mapTag = new Map();
  mapCat = new Map();

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private tagService: TagService,
    private categoryService: CategoryService,
    private activeRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.init();
  }
  async init() {
    this.isLogined = this.authService.isLogin();
    this.tagService.getTags()
      .subscribe(listTag => {
        this.mapTag = new Map(listTag.map(tag => [tag._id, tag.name]));
      });
    this.categoryService.getCategorys()
      .subscribe(listCat => {
        this.mapCat = new Map(listCat.map(cat => [cat._id, cat.name]));
      });
    this.activeRoute.queryParams
      .subscribe(params => {
        this.postService.getPublicPosts(params)
          .subscribe(posts => {
            this.posts = posts || [];
          });
      })
  }
  openPost(post) {

  }
}
