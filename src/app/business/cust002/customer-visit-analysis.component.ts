import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-customer-visit-analysis',
  standalone: true,
  imports: [SharedModule],
  template: `
    <nz-card [nzBordered]="false" nzTitle="客户拜访记录分析">
      <div nz-row>
        <div nz-col nzSpan="6">
          <nz-select style="width: 100%" nzPlaceHolder="选择统计周期" [(ngModel)]="selectedPeriod" (ngModelChange)="onPeriodChange()">
            <nz-option *ngFor="let period of periods" [nzLabel]="period.label" [nzValue]="period.value" />
          </nz-select>
        </div>
        <div nz-col nzSpan="6">
          <nz-select style="width: 100%" nzPlaceHolder="选择分类方式" [(ngModel)]="selectedCategory" (ngModelChange)="onCategoryChange()">
            <nz-option *ngFor="let category of categories" [nzLabel]="category.label" [nzValue]="category.value" />
          </nz-select>
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
export class CustomerVisitAnalysisComponent implements OnInit {
  chartOption: EChartsOption = {};

  periods = [
    { label: '本日', value: 'today' },
    { label: '本周', value: 'week' },
    { label: '本月', value: 'month' },
    { label: '本年', value: 'year' }
  ];
  selectedPeriod: string = 'week';

  categories = [
    { label: '按行业', value: 'industry' },
    { label: '按区域', value: 'region' }
  ];
  selectedCategory: string = 'industry';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  onPeriodChange(): void {
    this.fetchData();
  }

  onCategoryChange(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.http.get(`/cust002/visit_analysis?period=${this.selectedPeriod}&category=${this.selectedCategory}`).subscribe((result: any) => {
      this.updateChart(result.data, result.days);
    });
  }

  updateChart(data: any, days: any): void {
    const series = [];
    for (const category in data) {
      if (data.hasOwnProperty(category)) {
        series.push({
          name: category,
          type: 'bar' as 'bar',
          data: data[category]
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
        data: days as number[]
      },
      yAxis: {
        type: 'value'
      },
      series: series
    };
  }
}
