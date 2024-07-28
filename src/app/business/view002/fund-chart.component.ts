import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { EChartsOption } from 'echarts';
import { NzMarks } from 'ng-zorro-antd/slider';

@Component({
  selector: 'app-fund-chart',
  standalone: true,
  imports: [SharedModule],
  template: `
    <nz-card [nzBordered]="false" nzTitle="投资收益率分析">
      <div nz-row>
        <div nz-col nzSpan="24">
          <nz-slider
            [nzMarks]="marks"
            nzRange
            [nzMin]="-slider_len + 1"
            [nzMax]="0"
            [(ngModel)]="days"
            (nzOnAfterChange)="onDaysChange($event)"
          />
        </div>
      </div>
      <br />

      <div nz-row>
        <div nz-col nzSpan="24">
          <div echarts [options]="chartOption" style="height: 400px;"></div>
        </div>
      </div>
    </nz-card>
  `
})
export class FundChartComponent implements OnInit {
  chartOption: EChartsOption = {};

  marks: NzMarks = {};

  days = [-30, 0];
  slider_len = 101;
  trade_cal = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchTrade_cal();
  }

  fetchData(): void {
    let from_date = this.trade_cal[this.trade_cal.length - 1 + this.days[0]];
    let to_date = this.trade_cal[this.trade_cal.length - 1 + this.days[1]];

    this.http.get(`/view002/funds?from_date=${from_date}&to_date=${to_date}`).subscribe((result: any) => {
      this.updateChart(result.data, result.trade_cal_range);
    });
  }

  fetchTrade_cal(): void {
    this.http.get(`/view002/trade_cal`).subscribe((result: any) => {
      this.trade_cal = result.trade_cal;
      this.slider_len = this.trade_cal.length;
      this.marks = {};
      let marks_index: number[] = [0, -this.trade_cal.length + 1, this.days[0], this.days[1]];
      for (let index of marks_index) {
        this.marks[`${index}`] = this.trade_cal[this.trade_cal.length - 1 + index];
      }
      console.log('ok');
      this.fetchData();
    });
  }

  updateChart(data: any, trade_cal_range: any): void {
    const series = [];
    for (const fund in data) {
      if (data.hasOwnProperty(fund)) {
        series.push({
          name: fund,
          type: 'line' as 'line',
          data: data[fund]
        });
      }
    }

    this.chartOption = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: Object.keys(data)
      },
      xAxis: {
        type: 'category',
        data: trade_cal_range as string[]
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}%'
        }
      },
      series: series
    };
  }

  onDaysChange(days: number[] | number): void {
    //this.days = days;
    this.marks = {};
    let marks_index: number[] = [0, -this.trade_cal.length + 1, this.days[0], this.days[1]];
    for (let index of marks_index) {
      this.marks[`${index}`] = this.trade_cal[this.trade_cal.length - 1 + index];
    }

    console.log(`onChange: ${this.days[1] - this.days[0]}`);
    this.fetchData();
  }
}
