import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Tag } from '@models/_index';
import { TagService, AlertService } from '@services/_index';
import { showNoti } from '@shares/common';


@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.scss']
})
export class AddTagComponent implements OnInit {


  registerForm: UntypedFormGroup;
  name = '';
  description = '';
  imgUrl = '';
  content = '';
  isLoadingResults = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private tagService: TagService,
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
    const newTag: Tag = {
      name: data.name,
      description: data.description,
      imgUrl: data.imgUrl,
      content: data.content
    }
    this.tagService.addTag(newTag)
      .subscribe(tag => {
        if (tag) {
          showNoti(`Create success`, 'success');
          this.router.navigate(['/admin/blog/tag-list']);
        }
      }, (err) => {
        console.log(err);
        this.alertService.error(err.error);
      });
  }
}
