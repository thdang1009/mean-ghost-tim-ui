import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TKTService } from '@app/_services/tkt/tkt.service';
import { showNoti } from '@app/_shares/common';

@Component({
  selector: 'tkt-code',
  templateUrl: './tkt-code.component.html',
  styleUrls: ['./tkt-code.component.scss']
})
export class TktCodeComponent implements OnInit {

  codeForm: UntypedFormGroup;
  isRunning = false;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private tktService: TKTService) { }

  ngOnInit(): void {
    this.codeForm = this.formBuilder.group({
      codes: [null, Validators.required],
    });
  }
  onFormSubmit(data) {
    this.tktService.runTKTManually(data)
    .subscribe(res => {
      showNoti('Chạy thành công', 'success');
    }, error => {
      showNoti('Lỗi hệ thống', 'error');
    });
  }

}
