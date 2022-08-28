import { Component, OnInit } from '@angular/core';
import { TagService } from '@services/_index';
import { showNoti } from '@shares/common';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {


  tags = [];
  constructor(private tagService: TagService) { }

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
}
