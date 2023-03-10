import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SocketioService } from '@app/_services/_index';
import { TKTService } from '@app/_services/tkt/tkt.service';
import { handleSocketRunCode, showNoti } from '@app/_shares/common';
import { SK_RESULT_AUTO_RUN_TKT, LIST_USER_VN, LIST_USER_GLOBAL } from '@app/_shares/constant';

@Component({
  selector: 'tkt-code',
  templateUrl: './tkt-code.component.html',
  styleUrls: ['./tkt-code.component.scss']
})
export class TktCodeComponent implements OnInit {
  listServer = ['VN', 'GLOBAL'];
  server = this.listServer[0];
  codeForm: UntypedFormGroup;
  isRunning = false;
  resultSet = [
  ];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private tktService: TKTService,
    private socketService: SocketioService) { }

  ngOnInit(): void {
    this.codeForm = this.formBuilder.group({
      codes: [null, Validators.required],
    });
  }

  onFormSubmit(data) {
    this.isRunning = true;
    const map = {
      'VN': LIST_USER_VN,
      'GLOBAL': LIST_USER_GLOBAL
    }
    const list = map[this.server];
    this.tktService.runTKTManually(data, list)
      .subscribe(res => {
        showNoti('Đang chạy code', 'success');
      }, error => {
        this.isRunning = false;
        showNoti('Lỗi hệ thống', 'error');
      });
    this.socketService.subcribeChanel(SK_RESULT_AUTO_RUN_TKT, handleSocketRunCode, this);
  }
}
