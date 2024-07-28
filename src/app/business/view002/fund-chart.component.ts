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
          <div echarts [options]="chartOption" style="height: 400px;"></div>
        </div>
      </div>
    </nz-card>
  `
})
export class FundChartComponent implements OnInit {
  chartOption: EChartsOption = {};

  marks: NzMarks = {};

  days = [0, 0];
  slider_len = 1;
  trade_cal = [];

  cal_formatter = (value: number): string => {
    //return `${value}%`;
    // console.log(this.trade_cal[value]);
    return this.trade_cal[value];
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(`/view002/trade_cal`).subscribe((result: any) => {
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
      .get(`/view002/funds?from_date=${this.trade_cal[this.days[0]]}&to_date=${this.trade_cal[this.days[1]]}`)
      .subscribe((result: any) => {
        this.updateChart(result.data, result.trade_cal_range);
      });
  }

  updateSliderMarker(): void {
    this.marks = {};
    this.marks[`${this.days[0]}`] = this.trade_cal[this.days[0]];
    this.marks[`${this.days[1]}`] = this.trade_cal[this.days[1]];
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
    this.updateSliderMarker();

    console.log(`onChange: ${this.days[1] - this.days[0]}`);
    this.fetchData();
  }
}
