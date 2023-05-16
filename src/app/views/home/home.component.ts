import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookPermission } from '@app/_shares/enum';
import { AuthService, PostService } from '@services/_index';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  BookPermission = BookPermission;
  isLogined = false;
  hasBackofficePermission = false;
  isLoadingResults = true;
  thisYear = (new Date).getFullYear();
  posts = [];
  allPosts = [];
  isFilteredByTag = false;
  pageIndex = 1;

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.init();
  }

  async init() {
    this.isLogined = this.authService.isLogin();
    this.hasBackofficePermission = this.authService.isLogin();
    this.activeRoute.queryParams
      .subscribe(params => {
        const path = window.location.href
        if (path && path.includes('tag')) {
          this.isFilteredByTag = true;
        }
        this.postService.getPublicPosts(params)
          .subscribe(posts => {
            this.allPosts = (posts || []).reverse();
            this.posts = this.getMorePosts();
          });
      })
  }

  openPost(post) {
    // TODO document why this method 'openPost' is empty
  }

  backToHome() {
    this.isFilteredByTag = false;
    this.router.navigate(['home']);
  }

  getMorePosts(pageSize = 3) {
    let count = 0;
    let fistItem = this.allPosts.pop();
    const tempArray = [];
    while (fistItem && count < pageSize) {
      count++;
      tempArray.push(fistItem);
      fistItem = this.allPosts.pop();
    }
    return tempArray;
  }

  showMorePost() {
    this.posts = [...this.posts, ...this.getMorePosts(5)];
  }
}
