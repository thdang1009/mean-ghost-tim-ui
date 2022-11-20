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
  isFilteredByTag = false;

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
