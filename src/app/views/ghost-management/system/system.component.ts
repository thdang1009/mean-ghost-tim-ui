import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { SystemService } from '@app/_services/_index';

const timeToNextRestart = 20 * 1000;

@Component({
  selector: 'system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit {

  systemForm: UntypedFormGroup;
  isDisableRestart = false;
  isLoadingResults = false;

  constructor(
    private systemService: SystemService,
    private formBuilder: UntypedFormBuilder,
    ) {

  }

  ngOnInit() {
    this.systemForm = this.formBuilder.group({
    });
  }

  onFormSubmit() {
    this.isDisableRestart = true;
    this.isLoadingResults = true;
    this.triggerClock();

    this.systemService.restartServer()
      .subscribe((_: any) => {
        this.isLoadingResults = false;
      }, err => {
        this.isLoadingResults = false;
      });
  }

  triggerClock() {
    setTimeout(() => {
      this.isDisableRestart = false;
    }, timeToNextRestart)
  }

}
