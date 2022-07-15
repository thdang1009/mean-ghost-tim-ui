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
  chartTypeList = [
    'Pie',
    'Bar',
    'Line'
  ];
  chartType = this.chartTypeList[0];

  dataNumList = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6'
  ];

  colorPool = [
    '#71AD47',
    '#EE5007',
    '#EB5353',
    '#4472C4',
    '#FFC100',
    '#A5A5A5',
    '#ED7C32',
    '#5C9AD6'
  ];

  liList = [

  ]

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
  name4 = 'BỘ PHẬN';
  data4 = [
    { title: 'Hội đồng quản trị', val: 51 },
    { title: 'Ban chấp hành công đoàn', val: 5 },
    { title: 'Ban Điều Hành', val: 8 },
    { title: 'Ban Kiểm soát', val: 20 },
    { title: 'Công ty Cổ phần Chứng khoảng Kỹ Thương', val: 543 },
    { title: 'Công ty Cổ phần Quản lý quỹ Kỹ Thương', val: 34 },
    { title: 'Công ty TNHH MTV AMC', val: 296 },
    { title: 'Khối Công nghệ', val: 1010 },
    { title: 'Khối Chiến lược và Phát triển Ngân hàng', val: 32 },
    { title: 'Khối Dữ liệu và Phân tích', val: 167 },
    { title: 'Khối Khách hàng Doanh nghiệp', val: 1039 },
    { title: 'Khối Ngân hàng Bán buôn', val: 103 },
    { title: 'Khối Ngân hàng Bán lẻ', val: 6950 },
    { title: 'Khối Ngân hàng giao dịch toàn cầu', val: 186 },
    { title: 'Khối Quản trị Ngân hàng	', val: 95 },
    { title: 'Khối Quản trị rủi ro', val: 410 },
    { title: 'Khối Tài chính Kế hoạch	', val: 249 },
    { title: 'Khối Tiếp thị	', val: 33 },
    { title: 'Khối Vận hành	', val: 1299 },
    { title: 'Văn phòng chuyển đổi	', val: 96 },
    { title: 'Văn phòng Chuyển đổi Ngân hàng số', val: 156 },
    { title: 'Văn phòng Hội đồng quản trị', val: 6 }
  ];
  name5 = 'THÂM NIÊN LÀM VIỆC';
  data5 = [
    { title: '0', val: 3352 },
    { title: '1', val: 1942 },
    { title: '2', val: 1408 },
    { title: '3', val: 1147 },
    { title: '4', val: 821 },
    { title: '5', val: 533 },
    { title: '6', val: 504 },
    { title: '7', val: 423 },
    { title: '8', val: 287 },
    { title: '9', val: 184 },
    { title: '10', val: 352 },
    { title: '11', val: 476 },
    { title: '12', val: 269 },
    { title: '13', val: 314 },
    { title: '14', val: 347 },
    { title: '15', val: 148 },
    { title: '16', val: 120 },
    { title: '17', val: 62 },
    { title: '18', val: 23 },
    { title: '19', val: 21 },
    { title: '20', val: 17 },
    { title: '21', val: 7 },
    { title: '22', val: 5 },
    { title: '23', val: 1 },
    { title: '24', val: 3 },
    { title: '25', val: 9 },
    { title: '26', val: 8 },
    { title: '27', val: 4 },
    { title: '28', val: 1 }
  ];

  name6 = 'Tuổi';
  data6 = [
    { title: '18-20', val: 12 },
    { title: '21-30', val: 7376 },
    { title: '31-40', val: 4631 },
    { title: '41-50', val: 682 },
    { title: '51-60', val: 81 },
    { title: '61-68', val: 6 },
  ]

  map = {
    '1': this.data1,
    '2': this.data2,
    '3': this.data3,
    '4': this.data4,
    '5': this.data5,
    '6': this.data6
  };
  mapName = {
    '1': this.name1,
    '2': this.name2,
    '3': this.name3,
    '4': this.name4,
    '5': this.name5,
    '6': this.name6
  }

  dataNum = '1';

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    // const isAuthen = prompt('Nhập mã giới thiệu', 'Mã giới thiệu là bộ phim đầu tiên bạn và ny xem');
    // const formatted = isAuthen.trim().toLocaleLowerCase();
    // if (formatted !== 'nghề siêu dễ') {
    //   this.router.navigate(['home']);
    //   return;
    // }
    setTimeout(_ => {
      this.drawChart();
    }, 200);
  }

  chartTypeChange() {

  }

  dataNumChange() {
    this.drawChart();
  }

  drawChart() {
    this.chartName = this.mapName[this.dataNum];
    const sortFunc = (first, second) => { return Number(first.val) - Number(second.val) };
    const data = this.map[this.dataNum].map((el, index) => ({
      ...el,
      color: this.colorPool[index]
    })).sort(sortFunc);
    const colorPoolSorted = data.map(el => el.color);
    if (!window['AmCharts']) {
      alert('not');
      return;
    }
    window['AmCharts'].makeChart('chartdiv',
      {
        'type': 'pie',
        'balloonText': `[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>`,
        'labelText': '[[value]] ([[percents]]%)',
        'colors': colorPoolSorted,
        'outlineThickness': 0,
        'titleField': 'title',
        'valueField': 'val',
        'fontFamily': 'Times New Roman',
        'fontSize': 12,
        'theme': 'light',
        'allLabels': [],
        'balloon': {},
        'titles': [],
        'dataProvider': [...data].sort(sortFunc)
      }
    );

    const list = data.map((item, index) => ({
        content: item.title,
        type: 'square',
        color: colorPoolSorted[index],
      }));
    this.liList = list;
  }
  saveChartName() {
    
  }
}
