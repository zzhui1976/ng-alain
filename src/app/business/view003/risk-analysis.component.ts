import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { EChartsOption } from 'echarts';
import { NzMarks } from 'ng-zorro-antd/slider';

@Component({
  selector: 'app-risk-analysis',
  standalone: true,
  imports: [SharedModule],
  template: `
    <nz-card [nzBordered]="false" nzTitle="投资风险分析">
      <div nz-row>
        <div nz-col nzSpan="24">
          <nz-slider
            [nzMarks]="marks"
            [nzTipFormatter]="cal_formatter"
            nzRange
            [nzMin]="0"
            [nzMax]="slider_len - 1"
            [(ngModel)]="days"
            (nzOnAfterChange)="onDaysChange($event)"
          />
        </div>
      </div>
      <br />

      <div nz-row>
        <div nz-col nzSpan="24">
          <div echarts [options]="chartOption1" style="height: 400px;"></div>
        </div>
      </div>
    </nz-card>
  `
})
export class RiskAnalysisComponent implements OnInit {
  chartOption1: EChartsOption = {};

  marks: NzMarks = {};

  days = [0, 0];
  slider_len = 1;
  trade_cal = [];

  cal_formatter = (value: number): string => {
    return `${this.trade_cal[value]} [${value - this.slider_len + 1}]`;
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(`/view003/trade_cal`).subscribe((result: any) => {
      this.trade_cal = result.trade_cal;
      this.slider_len = this.trade_cal.length;
      this.days = [this.slider_len - 30, this.slider_len - 1];

      this.updateSliderMarker();

      console.log('ok');
      this.fetchData();
    });
  }

  fetchData(): void {
    this.http
      .get(`/view003/funds?from_date=${this.trade_cal[this.days[0]]}&to_date=${this.trade_cal[this.days[1]]}`)
      .subscribe((result: any) => {
        this.updateCharts(result.data, result.trade_cal_range);
      });
  }

  updateSliderMarker(): void {
    this.marks = {};
    this.marks[`${this.days[0]}`] = this.trade_cal[this.days[0]];
    this.marks[`${this.days[1]}`] = this.trade_cal[this.days[1]];
  }

  updateCharts(data: any, trade_cal_range: any): void {
    const series1 = this.generateSeries(data, '收益率');
    const series2 = this.generateSeries(data, '风险指标');
    const series3 = this.generateSeries(data, '风险溢价率');

    const legend = Object.keys(data);

    this.chartOption1 = {
      legend: {
        data: legend
      },
      tooltip: {
        trigger: 'axis'
      },
      radar: [
        {
          center: ['17%', '60%'],
          indicator: [{ name: '区间收益' }, { name: '今年收益' }, { name: '三年以来' }, { name: '成立以来' }, { name: '阿尔法收益' }]
        },
        {
          center: ['50%', '60%'],
          indicator: [{ name: '波动率' }, { name: '下行波动率' }, { name: '最大回撤' }, { name: '贝塔' }, { name: 'Var' }]
        },
        {
          center: ['83%', '60%'],
          indicator: [{ name: 'SHARP比率' }, { name: '信息比率' }, { name: '卡玛' }, { name: '索提诺' }, { name: '特雷诺' }]
        }
      ],
      series: [
        {
          type: 'radar',
          radarIndex: 0,
          data: series1,
          tooltip: { trigger: 'item' }
        },
        {
          type: 'radar',
          radarIndex: 1,
          data: series2,
          tooltip: { trigger: 'item' }
        },
        {
          type: 'radar',
          radarIndex: 2,
          data: series3,
          tooltip: { trigger: 'item' }
        }
      ]
    };
  }

  generateSeries(data: any, type: string): any[] {
    const series = [];
    for (const fund in data) {
      if (data.hasOwnProperty(fund) && fund !== '无风险3年定存') {
        series.push({
          name: fund,
          value: data[fund][type]
        });
      }
    }
    return series;
  }

  onDaysChange(days: number[] | number): void {
    this.updateSliderMarker();
    this.fetchData();
  }
}
