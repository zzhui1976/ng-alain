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
          <nz-slider [nzMarks]="marks" nzRange [nzMin]="-100" [nzMax]="0" [(ngModel)]="days" (nzOnAfterChange)="onDaysChange($event)" />
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

  today = new Date().toLocaleDateString();
  fromday = new Date(new Date().setDate(-100)).toLocaleDateString();

  marks: NzMarks = { '-100': this.fromday, '0': this.today, '-30': new Date(new Date().setDate(-30)).toLocaleDateString() };

  days = [-30, 0];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.http.get(`/view002/funds?days=${this.days[1] - this.days[0]}`).subscribe((data: any) => {
      this.updateChart(data);
    });
  }

  updateChart(data: any): void {
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
        data: Array.from({ length: this.days[1] - this.days[0] }, (_, i) =>
          new Date(new Date().setDate(this.days[0] + i)).toLocaleDateString()
        )
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

    this.marks = {
      '-100': this.fromday,
      '0': this.today
    };
    this.marks[`${this.days[0]}`] = new Date(new Date().setDate(this.days[0])).toLocaleDateString();
    this.marks[`${this.days[1]}`] = new Date(new Date().setDate(this.days[1])).toLocaleDateString();

    console.log(`onChange: ${this.days[1] - this.days[0]}`);
    this.fetchData();
  }
}
