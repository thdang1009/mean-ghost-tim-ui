import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounce } from '@app/_shares/common';
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
  numberOfAllPost = 0;

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    this.debouceFunc();
  }

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
            this.numberOfAllPost = posts.length;
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

  getMorePosts(pageSize = 4) {
    let count = 0;
    const tempArray = [];
    while (count < pageSize && this.allPosts.length) {
      count++;
      tempArray.push(this.allPosts.pop());
    }
    return tempArray;
  }

  showMorePost() {
    if (this.posts?.length < this.numberOfAllPost)
      this.posts = [...this.posts, ...this.getMorePosts(5)];
  }
  debouceFunc = debounce(this.showMorePost.bind(this), 500);
}
