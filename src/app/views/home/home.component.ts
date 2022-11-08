import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  isAdmin = false;
  isLoadingResults = true;
  thisYear = (new Date).getFullYear();
  posts = [];
  mapTag = new Map();
  mapCat = new Map();
  isFilteredByTag = false;

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private tagService: TagService,
    private categoryService: CategoryService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.init();
  }
  async init() {
    this.isLogined = this.authService.isLogin();
    this.isAdmin = this.authService.isAdmin();
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
        const path = window.location.href
        if (path && path.includes('tag')) {
          this.isFilteredByTag = true;
        }
        this.postService.getPublicPosts(params)
          .subscribe(posts => {
            this.posts = posts || [];
          });
      })
  }
  openPost(post) {

  }
  backToHome() {
    this.isFilteredByTag = false;
    this.router.navigate(['home']);
  }
}
