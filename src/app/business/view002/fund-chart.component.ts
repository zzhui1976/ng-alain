import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-fund-chart',
  standalone: true,
  imports: [SharedModule],
  template: `
    <nz-card [nzBordered]="false" nzTitle="投资收益率分析">
      <div nz-row>
        <div nz-col nzSpan="24">
          <nz-slider [nzMin]="10" [nzMax]="100" [(ngModel)]="days" (ngModelChange)="onDaysChange($event)" />
        </div>
      </div>

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
  days = 30;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.http.get(`/view002/funds?days=${this.days}`).subscribe((data: any) => {
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
        data: Array.from({ length: this.days }, (_, i) => `Day ${i + 1}`)
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

  onDaysChange(days: number): void {
    this.days = days;
    this.fetchData();
  }
}
