import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-am-chart',
  templateUrl: './am-chart.component.html',
  styleUrls: ['./am-chart.component.css']
})
export class AmChartComponent implements OnInit {


  // two-way var
  chartName = '';

  // data
  name1 = 'TÌNH TRẠNG NHÂN VIÊN';
  data1 = [
    {
      'title': 'Thực tập sinh',
      'val': '13'
    },
    {
      'title': 'Thử việc',
      'val': '536'
    },
    {
      'title': 'Nhà thầu',
      'val': '871'
    },
    {
      'title': 'Chính thức',
      'val': '11368'
    }
  ];
  name2 = 'TÌNH TRẠNG HỢP ĐỒNG';
  data2 = [
    {
      'title': 'Hợp đồng dịch vụ',
      'val': '872'
    },
    {
      'title': 'Hợp đồng không xác định thời hạn',
      'val': '6048'
    },
    {
      'title': 'Hợp đồng xác định thời hạn 12 tháng',
      'val': '934'
    },
    {
      'title': 'Hợp đồng xác định thời hạn 24 tháng',
      'val': '3843'
    },
    {
      'title': 'Hợp đồng xác định thời hạn 36 tháng',
      'val': '1091'
    }
  ];
  name3 = 'TRÌNH ĐỘ HỌC VẤN	';
  data3 = [
    {
      'title': 'Trung cấp',
      'val': '138'
    },
    {
      'title': 'THPT',
      'val': '33'
    },
    {
      'title': 'Cao đẳng',
      'val': '664'
    },
    {
      'title': 'Chứng chỉ',
      'val': '28'
    },
    {
      'title': 'Chưa nhận bằng',
      'val': '702'
    },
    {
      'title': 'Đại học',
      'val': '10407'
    },
    {
      'title': 'Thạc sỹ',
      'val': '808'
    },
    {
      'title': 'Tiến sỹ',
      'val': '8'
    }
  ];
  map = {
    '0': this.data1,
    '1': this.data2,
    '2': this.data3
  }
  mapName = {
    '0': this.name1,
    '1': this.name2,
    '2': this.name3
  }

  dataNum = '0';

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    const isAuthen = prompt('Nhập mã giới thiệu', 'Mã giới thiệu là tên ny của bạn');
    if (isAuthen !== 'Đăng') {
      this.router.navigate(['home']);
      return;
    }
    setTimeout(_ => {
      this.drawChart();
    }, 200);
  }

  drawChart() {
    this.chartName = this.mapName[this.dataNum];
    const colorPool = [
      '#71AD47',
      '#EE5007',
      '#EB5353',
      '#4472C4',
      '#FFC100',
      '#A5A5A5',
      '#ED7C32',
      '#5C9AD6'
    ];
    if (!window['AmCharts']) {
      alert('not');
      return;
    }
    window['AmCharts'].makeChart('chartdiv',
      {
        'type': 'pie',
        'balloonText': `[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>`,
        'labelText': '[[value]] ([[percents]]%)',
        'colors': colorPool,
        'outlineThickness': 0,
        'titleField': 'title',
        'valueField': 'val',
        'fontFamily': 'Times New Roman',
        'fontSize': 12,
        'theme': 'light',
        'allLabels': [],
        'balloon': {},
        'titles': [],
        'dataProvider': [...this.map[this.dataNum]].sort((first, second) => { return Number(first.val) - Number(second.val) })
      }
    );
    const ul = document.getElementById('ul-legend-container');
    const append = (node, item, index) => {
      const text = document.createTextNode(item.title);
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.style.color = 'black';
      li.style.color = colorPool[index];
      li.style.textAlign = 'left';
      li.type = 'square';
      span.appendChild(text);
      li.appendChild(span);
      node.appendChild(li);
    }
    this.map[this.dataNum].forEach((item, index) => {
      append(ul, item, index);
    });
  }
  saveChartName() {

  }
}
