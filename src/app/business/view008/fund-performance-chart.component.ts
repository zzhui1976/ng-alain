import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { EChartsOption } from 'echarts';
import { NzMarks } from 'ng-zorro-antd/slider';

@Component({
  selector: 'app-fund-performance-chart',
  standalone: true,
  imports: [SharedModule],
  template: `
    <nz-card [nzBordered]="false" nzTitle="基金业绩排名分析">
      <div nz-row>
        <div nz-col nzSpan="24">
          <nz-slider
            [nzMarks]="marks"
            [nzTipFormatter]="month_formatter"
            nzRange
            [nzMin]="0"
            [nzMax]="slider_len - 1"
            [(ngModel)]="months"
            (nzOnAfterChange)="onMonthsChange($event)"
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
export class FundPerformanceChartComponent implements OnInit {
  chartOption: EChartsOption = {};

  marks: NzMarks = {};

  months = [0, 0];
  slider_len = 1;
  trade_months = [];

  month_formatter = (value: number): string => {
    return `${this.trade_months[value]} [${value - this.slider_len + 1}]`;
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(`/view008/trade_months`).subscribe((result: any) => {
      this.trade_months = result.trade_months;
      this.slider_len = this.trade_months.length;
      this.months = [this.slider_len - 12, this.slider_len - 1];

      this.updateSliderMarker();

      console.log('ok');
      this.fetchData();
    });
  }

  fetchData(): void {
    this.http
      .get(`/view008/funds?from_month=${this.trade_months[this.months[0]]}&to_month=${this.trade_months[this.months[1]]}`)
      .subscribe((result: any) => {
        this.updateChart(result.data, result.trade_months_range);
      });
  }

  updateSliderMarker(): void {
    this.marks = {};
    this.marks[`${this.months[0]}`] = this.trade_months[this.months[0]];
    this.marks[`${this.months[1]}`] = this.trade_months[this.months[1]];
  }

  updateChart(data: any, trade_months_range: any): void {
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
        data: trade_months_range as string[]
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}'
        }
      },
      series: series
    };
  }

  onMonthsChange(months: number[] | number): void {
    this.updateSliderMarker();

    console.log(`onChange: ${this.months[1] - this.months[0]}`);
    this.fetchData();
  }
}
