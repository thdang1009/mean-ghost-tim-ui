import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Category } from '@models/_index';
import { CategoryService, AlertService } from '@services/_index';
import { showNoti } from '@shares/common';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {


  registerForm: UntypedFormGroup;
  name = '';
  description = '';
  imgUrl = '';
  content = '';
  isLoadingResults = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private categoryService: CategoryService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      imgUrl: [null, Validators.required],
      content: [null, Validators.required],
    });
  }

  onFormSubmit(data: any) {
    console.log(data);
    const newCategory: Category = {
      name: data.name,
      description: data.description,
      imgUrl: data.imgUrl,
      content: data.content
    }
    this.categoryService.addCategory(newCategory)
      .subscribe(category => {
        if (category) {
          showNoti(`Create success`, 'success');
          this.router.navigate(['/admin/blog/category-list']);
        }
      }, (err) => {
        console.log(err);
        this.alertService.error(err.error);
      });
  }
}
