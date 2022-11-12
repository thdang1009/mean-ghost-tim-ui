import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FilePermission } from '@app/_shares/constant';
import { MyFile } from '@models/_index';
import { FileService, AlertService } from '@services/_index';
import { showNoti } from '@shares/common';


@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss']
})
export class AddFileComponent implements OnInit {


  registerForm: UntypedFormGroup;
  name = '';
  description = '';
  imgUrl = '';
  content = '';
  isLoadingResults = false;
  isUpdate = false;
  id = undefined;
  filePermissionList = [FilePermission.PRIVATE, FilePermission.PUBLIC, FilePermission.PROTECTED];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private fileService: FileService,
    private alertService: AlertService
  ) { }

  compareWithFunc(a, b) {
    return a == b;
  }

  handleAfterUpload(e) {
    console.log(e);
    this.reloadWithID(e);
  }

  reloadWithID(item) {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: { id: item.id },
        queryParamsHandling: 'merge'
      });
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      // url: [null, Validators.required],
      // user: [null, Validators.required],
      permission: [null, Validators.required],
      originName: [null, Validators.required],
      nameOnDisk: [null, Validators.required],
      urlGet: [null, Validators.required],
      pathOnDisk: [null, Validators.required],
      ext: [null, Validators.required],
      type: [null, Validators.required],
    });
    this.route.queryParams.subscribe(params => {
      const id = params.id;
      if (id) {
        this.fileService.getFile(id)
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
    // console.log(this.registerForm.get('user'));
  }

  onFormSubmit(data: any) {
    const newFile: MyFile = {
      user: data.user,
      originName: data.originName,
      nameOnDisk: data.nameOnDisk,
      urlGet: data.urlGet,
      pathOnDisk: data.pathOnDisk,
      permission: data.permission,
      ext: data.ext,
      type: data.type
    }
    this.isUpdate ? this.callUpdate(this.id, newFile) : this.callCreate(newFile)
  }
  callUpdate(id, newFile) {
    this.fileService.updateFile(id, newFile)
      .subscribe(file => {
        if (file) {
          showNoti(`Update success`, 'success');
          this.router.navigate(['/admin/tool/file-list']);
        }
      }, (err) => {
        console.log(err);
        this.alertService.error(err.error);
      });
  }

  callCreate(newFile) {
    this.fileService.addFile(newFile)
      .subscribe(file => {
        if (file) {
          showNoti(`Create success`, 'success');
          this.router.navigate(['/admin/tool/file-list']);
        }
      }, (err) => {
        console.log(err);
        this.alertService.error(err.error);
      });
  }
}
