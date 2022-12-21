import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TagService } from '@services/_index';
import { showNoti } from '@shares/common';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html'
})
export class TagListComponent implements OnInit {


  tags = [];
  constructor(private tagService: TagService,
    private router: Router) { }

  ngOnInit(): void {
    this.getTags();
  }
  getTags() {
    this.tagService.getTags().subscribe(tags => {
      this.tags = tags;
    }, (err) => {
      console.log(err);
      showNoti(`Create tag fail!`, 'danger');
    });
  }
  delete(tag) {

    if (!tag) {
      return;
    }
    const id = tag._id;
    if (tag) {
      this.tagService.deleteTag(id)
        .subscribe((_: any) => {
          showNoti('Tag deleted!', 'success');
          this.getTags();
        }, err => {
        });
    }
  }

  edit(tag) {
    if (!tag) {
      return;
    }
    this.router.navigate(
      ['admin/blog/tag'],
      {
        queryParams: { id: tag._id }
      });
  }
}
