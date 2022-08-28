import { Component, OnInit } from '@angular/core';
import { CategoryService } from '@services/_index';
import { showNoti } from '@shares/common';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {


  categorys = [];
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategorys();
  }
  getCategorys() {
    this.categoryService.getCategorys().subscribe(categorys => {
      this.categorys = categorys;
    }, (err) => {
      console.log(err);
      showNoti(`Create category fail!`, 'danger');
    });
  }
  delete(category) {

    if (!category) {
      return;
    }
    const id = category._id;
    if (category) {
      this.categoryService.deleteCategory(id)
        .subscribe((_: any) => {
          showNoti('Category deleted!', 'success');
          this.getCategorys();
        }, err => {
        });
    }
  }
}
