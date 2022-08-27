import { Component, OnInit } from '@angular/core';
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

  constructor(
    private authService: AuthService,
    private postService: PostService,
    private tagService: TagService,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit() {
    this.init();
  }
  async init() {

    this.isLogined = this.authService.isLogin();
    const listTag = await this.tagService.getTags().toPromise();
    const listCategory = await this.categoryService.getCategorys().toPromise();
    this.postService.getPublicPosts()
      .subscribe(posts => {
        console.log(listTag);
        console.log(listCategory);
        this.posts = posts || [];
      })

  }
  openPost(post) {

  }
}
