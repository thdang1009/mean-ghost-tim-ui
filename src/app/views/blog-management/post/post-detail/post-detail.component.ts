import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '@app/_services/_index';
import { Router } from '@angular/router';
import { Title, Meta } from "@angular/platform-browser";

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
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private meta: Meta) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('ref');
    this.postService.getPost(id).subscribe(post => {
      this.item = post;
      this.count = post.clapCount;
      this.ready = true;
      this.titleService.setTitle(post.title as string);
      this.meta.addTags([
        { name: 'description', content: post.description as string },
        { name: 'keywords', content: post.tags.map(el => el.name).join(', ') },
        { name: 'og:title', content: post.title as string },
        { name: 'og:image', content: post.postBackgroundImg as string },
        { name: 'og:description', content: post.description as string },
        { name: 'og:type', content: 'website' },
      ]);
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
    console.log('update');
  }

  removeClap() {
    console.log('remove');
  }
  imgClick() {

  }
  backToHome() {
    this.router.navigate(['home']);
  }
}
