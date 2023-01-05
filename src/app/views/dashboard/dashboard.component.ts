import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TDTD_STATUS } from '@app/_shares/enum';
import { IssueService, AnalyticService, UserService, TodoTodayService } from '@services/_index';
import { nextStatus, showNoti } from '@shares/common';
import * as Chartist from 'chartist';
import * as dateFns from 'date-fns';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  totalAccess = 0;
  allSpace = 512;
  usagedSpace = 0;

  loadingTDTD = [];
  loadingUser = false;

  users = [];
  tdtds = []
  loadingOpacity = 1;

  issues: Observable<any>;
  issuesLength = 0;
  pageLinks: object;
  constructor(
    private userService: UserService,
    private todoTodayService: TodoTodayService,
    private analyticService: AnalyticService,
    private router: Router,
    private issueService: IssueService
  ) { }
  //#region don't touch
  startAnimationForLineChart(chart) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };
  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };
  ngOnInit() {
    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */
    this.init();
  }
  //#endregion don't touch

  init() {
    this.getMyUser();
    this.getMyToDoToDay();
    this.getTotalAccess();
    this.getStoragedSpace();
    this.getIssues();
  }

  getStoragedSpace() {
    this.analyticService.getStoragedSpace()
      .subscribe(res => {
        this.usagedSpace = (
          res.stats.indexSize + res.stats.dataSize
        ) || 0;
      }, (err) => {
        console.log(err);
        showNoti(`getStoragedSpace fail!`, 'danger');
      }); ;
  }

  getTotalAccess() {
    this.analyticService.getTotalAccess()
      .subscribe(res => {
        this.totalAccess = res.count || 0;
      }, (err) => {
        console.log(err);
        showNoti(`Get total access fail!`, 'danger');
      }); ;
  }

  getMyUser() {
    this.userService.getUsers()
      .subscribe(users => {
        this.users = users.slice(0, 5);
      }, (err) => {
        console.log(err);
        showNoti(`getMyUserß fail!`, 'danger');
      });
  }

  getMyToDoToDay() {
    const value = new Date();
    const fromDate = dateFns.startOfDay(value);
    const toDate = dateFns.endOfDay(value);
    const req = {
      from: fromDate || undefined,
      to: toDate || undefined,
      status: undefined
    }
    this.todoTodayService.getMyTodoToday(req)
      .subscribe((res: any) => {
        this.tdtds = res.map(el => ({
          ...el,
          checked: el.status === TDTD_STATUS.DONE,
          nextStatus: nextStatus(el.status)
        }));
      }, err => {
      });
  }
  checkboxChange(item, index) {
    this.update({
      ...item,
      status: item.status === TDTD_STATUS.DONE ? TDTD_STATUS.NEW : TDTD_STATUS.DONE
    }, index);
  }
  update(item, index) {
    this.loadingTDTD[index] = true;
    this.todoTodayService.updateTodoToday(item.id, item)
      .subscribe((res: any) => {
        this.tdtds[index] = {
          ...res,
          checked: res.status === TDTD_STATUS.DONE,
        };
        this.loadingTDTD[index] = false;
      }, err => {
        this.loadingTDTD[index] = false;
      });
  }
  deleteTDTD(tdtd, index) {
    const val = confirm(`Delete "${tdtd.content}"?`);
    if (val) {
      this.callDeleteTDTD(tdtd.id, index);
    }
  }
  callDeleteTDTD(id, index) {
    if (id) {
      this.loadingTDTD[index] = true;
      this.todoTodayService.deleteTodoToday(id)
        .subscribe((_: any) => {
          this.loadingTDTD[index] = false;
          this.tdtds = this.tdtds.filter(el => el.id !== id);
        }, err => {
          this.loadingTDTD[index] = false;
        });
    }
  }
  reloadTDTD() {
    this.getMyToDoToDay();
  }
  redirectToTDTD() {
    this.router.navigateByUrl('/admin/tool/todo-today');
  }

  getIssues(url?: string): void {
    this.issueService.getIssues(url).subscribe((data) => {
      const link = data.headers.get('Link');
      if (link) {
        this.pageLinks = this.parseLinkHeader(link);
      }
      this.issues = data.body;
      this.issuesLength = data.body.length || 0;
    });
  }

  /**
  * Returns pagination links from "Link" header parameter
  * in form of an object.
  *
  * @param header: string - "Link" header parameter string for parsing.
  */
  parseLinkHeader(header: string) {
    const links = {};

    header.split(',').forEach(element => {
      const m = element.match(/<([^>]*)>; rel="(.*)"/);
      links[m[2]] = m[1];
    });
    return links;
  }
}
