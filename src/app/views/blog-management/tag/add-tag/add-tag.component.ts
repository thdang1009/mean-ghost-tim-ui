import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tag } from '@models/_index';
import { TagService, AlertService } from '@services/_index';
import { showNoti } from '@shares/common';


@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
})
export class AddTagComponent implements OnInit {


  registerForm: UntypedFormGroup;
  name = '';
  description = '';
  imgUrl = '';
  content = '';
  isLoadingResults = false;
  isUpdate = false;
  id = undefined;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private tagService: TagService,
    private alertService: AlertService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      imgUrl: [null, Validators.required],
      content: [null, Validators.required],
    });
    this.route.queryParams.subscribe(params => {
      const id = params.id;
      if (id) {
        this.tagService.getTag(id)
          .subscribe(res => {
            this.initFormWithData(res);
            this.isUpdate = true;
            this.id = id;
          });
      }
    });
  }

  initFormWithData(data = {} as any) {
    this.registerForm.patchValue(data);
  }

  onFormSubmit(data: any) {
    console.log(data);
    const newTag: Tag = {
      name: data.name,
      description: data.description,
      imgUrl: data.imgUrl,
      content: data.content
    }
    this.isUpdate ? this.callUpdate(this.id, newTag) : this.callCreate(newTag)
  }
  callUpdate(id, newValue) {

    this.tagService.updateTag(id, newValue)
      .subscribe(tag => {
        if (tag) {
          showNoti(`Update success`, 'success');
          this.router.navigate(['/admin/blog/tag-list']);
        }
      }, (err) => {
        console.log(err);
        this.alertService.error(err.error);
      });
  }
  callCreate(newValue) {

    this.tagService.addTag(newValue)
      .subscribe(tag => {
        if (tag) {
          showNoti(`Success`, 'success');
          this.router.navigate(['/admin/blog/tag-list']);
        }
      }, (err) => {
        console.log(err);
        this.alertService.error(err.error);
      });
  }
}
