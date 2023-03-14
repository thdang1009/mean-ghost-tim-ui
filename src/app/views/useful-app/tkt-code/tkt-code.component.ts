import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { SocketioService } from '@app/_services/_index';
import { TKTService } from '@app/_services/tkt/tkt.service';
import { handleSocketRunCode, showNoti } from '@app/_shares/common';
import { SK_RESULT_AUTO_RUN_TKT, LIST_USER_VN, LIST_USER_GLOBAL } from '@app/_shares/constant';
import * as XLSX from 'xlsx';

@Component({
  selector: 'tkt-code',
  templateUrl: './tkt-code.component.html',
  styleUrls: ['./tkt-code.component.scss']
})
export class TktCodeComponent implements OnInit {
  listServer = ['AE VN', 'AE GLOBAL', 'UPLOAD NEW'];
  listUser = LIST_USER_VN;
  server = this.listServer[0];
  codeForm: UntypedFormGroup;
  isRunning = false;
  fileName = '';
  resultSet = [
    // {
    //   code: -1,
    //   message: 'test 1',
    //   codeInput: 'code1',
    //   name: 'name1',
    //   id: 'id1',
    //   sdtout: '{"message":"active code get lock fail","error":{"trace_id":"505d0421b1a10bd1521314d5215e8a50","module":"Elixir.ReturnCode","message":"active code get lock fail","code":85045996,"app":"game_adapter_ex"},"code":10607}'
    // },
    // {
    //   code: -1,
    //   message: 'test 1',
    //   codeInput: 'code1',
    //   name: 'name1',
    //   id: 'id1',
    //   sdtout: '{"message":"active code get lock fail","error":{"trace_id":"505d0421b1a10bd1521314d5215e8a50","module":"Elixir.ReturnCode","message":"active code get lock fail","code":85045996,"app":"game_adapter_ex"},"code":10607}'
    // },
    // {
    //   code: -1,
    //   message: 'test 1',
    //   codeInput: 'code1',
    //   name: 'name1',
    //   id: 'id1',
    //   sdtout: '{"message":"active code get lock fail","error":{"trace_id":"505d0421b1a10bd1521314d5215e8a50","module":"Elixir.ReturnCode","message":"active code get lock fail","code":85045996,"app":"game_adapter_ex"},"code":10607}'
    // },
    // {
    //   code: 0,
    //   message: 'test 1',
    //   codeInput: 'code1',
    //   name: 'name1',
    //   id: 'id1',
    //   sdtout: '{"message":"ok","items":[{"reward_uuid":"64095d7d7b74c69febd8974a","reward_type":2023030810,"reward_desc":{"subject":"Đổi code thành công","rewardItems":[{"item":11,"amount":50}],"meta":{},"deadline":1678789642,"custom_packages":[],"catalogue_id":0,"catalogue":"system","body":"Chúc mừng Chủ Công nhận thưởng quà code!"},"action":"ActiveReward"}],"code":200}'
    // },
    // {
    //   code: -1,
    //   message: 'test 1',
    //   codeInput: 'code1',
    //   name: 'name1',
    //   id: 'id1',
    //   sdtout: '{"message":"active code get lock fail","error":{"trace_id":"505d0421b1a10bd1521314d5215e8a50","module":"Elixir.ReturnCode","message":"active code get lock fail","code":85045996,"app":"game_adapter_ex"},"code":10607}'
    // },
    // {
    //   code: -1,
    //   message: 'test 1',
    //   codeInput: 'code1',
    //   name: 'name1',
    //   id: 'id1',
    //   sdtout: '{"message":"active code get lock fail","error":{"trace_id":"505d0421b1a10bd1521314d5215e8a50","module":"Elixir.ReturnCode","message":"active code get lock fail","code":85045996,"app":"game_adapter_ex"},"code":10607}'
    // },
    // {
    //   code: -1,
    //   message: 'test 1',
    //   codeInput: 'code1',
    //   name: 'name1',
    //   id: 'id1',
    //   sdtout: '{"message":"active code get lock fail","error":{"trace_id":"505d0421b1a10bd1521314d5215e8a50","module":"Elixir.ReturnCode","message":"active code get lock fail","code":85045996,"app":"game_adapter_ex"},"code":10607}'
    // },
    // {
    //   code: 0,
    //   message: 'test 1',
    //   codeInput: 'code1',
    //   name: 'name1',
    //   id: 'id1',
    //   sdtout: '{"message":"ok","items":[{"reward_uuid":"64095d7d7b74c69febd8974a","reward_type":2023030810,"reward_desc":{"subject":"Đổi code thành công","rewardItems":[{"item":11,"amount":50}],"meta":{},"deadline":1678789642,"custom_packages":[],"catalogue_id":0,"catalogue":"system","body":"Chúc mừng Chủ Công nhận thưởng quà code!"},"action":"ActiveReward"}],"code":200}'
    // },
    // {
    //   code: -1,
    //   message: 'test 1',
    //   codeInput: 'code1',
    //   name: 'name1',
    //   id: 'id1',
    //   sdtout: '{"message":"active code get lock fail","error":{"trace_id":"505d0421b1a10bd1521314d5215e8a50","module":"Elixir.ReturnCode","message":"active code get lock fail","code":85045996,"app":"game_adapter_ex"},"code":10607}'
    // },
    // {
    //   code: -1,
    //   message: 'test 1',
    //   codeInput: 'code1',
    //   name: 'name1',
    //   id: 'id1',
    //   sdtout: '{"message":"active code get lock fail","error":{"trace_id":"505d0421b1a10bd1521314d5215e8a50","module":"Elixir.ReturnCode","message":"active code get lock fail","code":85045996,"app":"game_adapter_ex"},"code":10607}'
    // },
    // {
    //   code: -1,
    //   message: 'test 1',
    //   codeInput: 'code1',
    //   name: 'name1',
    //   id: 'id1',
    //   sdtout: '{"message":"active code get lock fail","error":{"trace_id":"505d0421b1a10bd1521314d5215e8a50","module":"Elixir.ReturnCode","message":"active code get lock fail","code":85045996,"app":"game_adapter_ex"},"code":10607}'
    // },
    // {
    //   code: 0,
    //   message: 'test 1',
    //   codeInput: 'code1',
    //   name: 'name1',
    //   id: 'id1',
    //   sdtout: '{"message":"ok","items":[{"reward_uuid":"64095d7d7b74c69febd8974a","reward_type":2023030810,"reward_desc":{"subject":"Đổi code thành công","rewardItems":[{"item":11,"amount":50}],"meta":{},"deadline":1678789642,"custom_packages":[],"catalogue_id":0,"catalogue":"system","body":"Chúc mừng Chủ Công nhận thưởng quà code!"},"action":"ActiveReward"}],"code":200}'
    // }

  ];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private tktService: TKTService,
    private socketService: SocketioService) { }

  ngOnInit(): void {
    this.codeForm = this.formBuilder.group({
      codes: [null, Validators.required],
    });
    this.socketService.subcribeChanel(SK_RESULT_AUTO_RUN_TKT, handleSocketRunCode, this);
  }

  handleCmdExportExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.resultSet);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Results");
    XLSX.writeFile(workbook, this.fileName, { compression: true });
  }

  handleCmdClearConsole() {
    this.isRunning = true;
    this.resultSet.length = 0;
    this.isRunning = false;
  }

  handleCmdCopy() {
    this.isRunning = true;
    const code = this.resultSet.map(el => el.message).join('\n');
    try {
      navigator.clipboard.writeText(code);
      showNoti('Copied!', 'success');
    } catch (e) {
      showNoti(e, 'danger');
    } finally {
      this.isRunning = false;
    }
  }

  updateList() {
    const map = {
      'AE VN': LIST_USER_VN,
      'AE GLOBAL': LIST_USER_GLOBAL,
      'UPLOAD NEW': [],
    }
    this.listUser = map[this.server];
  }

  formatListUser(input = []) {
    return input.map(el => ([el.account, el.id]));
  }

  onFormSubmit(data) {
    this.isRunning = true;
    this.tktService.runTKTManually(data, this.formatListUser(this.listUser))
      .subscribe(res => {
        showNoti('Đang chạy code', 'success');
      }, error => {
        this.isRunning = false;
        showNoti('Lỗi hệ thống', 'error');
      });
  }
  onFileChange(evt) {

    console.log('debug file changed');
    if (!evt.target.files || !evt.target.files[0]) {
      return;
    }

    const file = evt.target.files[0];
    this.fileName = evt.target.files[0].name;
    if (this.fileName) {
      // file valid, can upload
      // file to JSON:
      const target: DataTransfer = <DataTransfer>(evt.target);
      if (target.files.length !== 1) {
        throw new Error('Cannot use multiple files');
      }
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        /* save data */
        const data = <any>(XLSX.utils.sheet_to_json(ws, {
          header: ['A', 'B', 'C']
        }));
        const first = typeof data[1].A;
        const second = typeof data[1].B;
        const third = typeof data[1].C;

        // stt name id
        let title = {
          sttCol: 'A',
          accountCol: 'B',
          idCol: 'C'
        };
        // cột cầu là tên, cột 2 là chuỗi
        if (first === 'string' && second === 'number') {
          title = {
            sttCol: '',
            accountCol: 'A',
            idCol: 'B'
          }
        } else if (first === 'number' && second === 'string' && third === 'number') { // cột đầu là stt cột 2 là name cột 3 là id
          title = {
            sttCol: 'A',
            accountCol: 'B',
            idCol: 'C'
          }
        } else if (first === 'number' && second === 'string') { // cột đầu là id cột 2 là name
          title = {
            sttCol: '',
            accountCol: 'B',
            idCol: 'A'
          }
        } else {
          showNoti('Format file không hợp lệ', 'error');
        }
        const formatData = data.map(el => ({
          account: el[title.accountCol],
          id: el[title.idCol]
        }));
        console.log(formatData);
        formatData.shift();
        this.listUser = formatData;
        this.server = this.listServer[2];
      };
      reader.readAsBinaryString(target.files[0]);
    } else {
      showNoti('File lỗi', 'error');

    }
    evt.target.value = '';
  }

  cancelCurrentRunning() {
    this.tktService.runCancel()
      .subscribe(() => {
        this.isRunning = false;
        showNoti('Đã cancel tất cả tiến trình hiện hành', 'success');
      }, error => {
        showNoti('Lỗi hệ thống', 'error');
      });
  }
}
