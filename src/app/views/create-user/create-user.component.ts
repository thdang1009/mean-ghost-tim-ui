import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { showNoti } from '@app/_shares/common';
import { UserService } from '@app/_services/user.service';
import { User } from '@app/_models/user';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


export class MyErrorStateMatcherRepassword implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    const invalidCtrl = !!(control.invalid && (control.parent.dirty || control.touched));
    const invalidParent = !!(control.parent && control.parent.invalid && control.parent.dirty);
    return !!(control && (invalidCtrl || invalidParent) && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  registerForm: FormGroup;
  fullName = '';
  username = '';
  password = '';
  repassword = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  matcherRepassword = new MyErrorStateMatcherRepassword();
  permissions = [
    'ADMIN',
    'MEMBER'
  ];
  permission = this.permissions[1]; // CONSTANT.PERMISSION.MEMBER;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, Validators.required],
      repassword: [null, Validators.required],
      permission: [this.permissions[1], Validators.required]
    }, {
      validators: this.checkReasswords
    });
  }

  checkReasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('password').value;
    const confirmPass = group.get('repassword').value;
    return pass === confirmPass ? null : { notSame: true }
  }

  onFormSubmit(data: any) {
    console.log(data);
    const newUser: User = {
      fullName: data.fullName,
      username: data.username,
      permission: data.permission,
      password: data.password
    }
    this.userService.addUser(newUser)
      .subscribe(user => {
        if (user && user.id) {
          showNoti(`Create success`, 'success');
          this.router.navigate(['/admin/list-user']);
        }
      }, (err) => {
        console.log(err);
        alert(err.error);
      });
  }
}
