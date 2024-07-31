import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { EChartsOption } from 'echarts';
import { NzMarks } from 'ng-zorro-antd/slider';

@Component({
  selector: 'app-asset-category-analysis',
  standalone: true,
  imports: [SharedModule],
  template: `
    <nz-card [nzBordered]="false" nzTitle="仓位分析（按资产类别）">
      <div nz-row>
        <div nz-col nzSpan="4">
          <nz-tree-select
            style="width: 90%"
            [nzDefaultExpandAll]="true"
            [nzCheckStrictly]="true"
            nzPlaceHolder="选择资产分类"
            [nzNodes]="assetTree"
            [(ngModel)]="selectedAssetCategory"
            (ngModelChange)="onAssetCategoryChange()"
          />
        </div>
        <div nz-col nzSpan="12">
          <nz-select
            style="width: 90%"
            nzCheckable
            nzPlaceHolder="选择投资组合"
            [(ngModel)]="selectedPortfolios"
            (ngModelChange)="onPortfolioChange()"
            nzMode="multiple"
          >
            <nz-option *ngFor="let portfolio of portfolios" [nzLabel]="portfolio.name" [nzValue]="portfolio.id" />
          </nz-select>
        </div>
      </div>

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
export class AssetCategoryAnalysisComponent implements OnInit {
  chartOption: EChartsOption = {};

  marks: NzMarks = {};

  days = [0, 0];
  slider_len = 1;
  trade_cal = [];

  portfolios: any[] = [];
  selectedPortfolios: string[] = [];
  assetTree: any[] = [];
  selectedAssetCategory?: string;

  cal_formatter = (value: number): string => {
    return `${this.trade_cal[value]} [${value - this.slider_len + 1}]`;
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPortfolios();
    this.fetchAssetTree();
    this.fetchTradeCal();
  }

  fetchPortfolios(): void {
    this.http.get(`/view007/portfolios`).subscribe((result: any) => {
      this.portfolios = result.portfolios;
    });
  }

  fetchAssetTree(): void {
    this.http.get(`/view007/asset_tree`).subscribe((result: any) => {
      this.assetTree = result.assetTree;
    });
  }

  fetchTradeCal(): void {
    this.http.get(`/view007/trade_cal`).subscribe((result: any) => {
      this.trade_cal = result.trade_cal;
      this.slider_len = this.trade_cal.length;
      this.days = [this.slider_len - 30, this.slider_len - 1];
      this.updateSliderMarker();
    });
  }

  onPortfolioChange(): void {
    this.fetchData();
  }

  onAssetCategoryChange(): void {
    this.fetchData();
  }

  onDaysChange(days: number[] | number): void {
    this.days = days as number[];
    this.updateSliderMarker();
    this.fetchData();
  }

  updateSliderMarker(): void {
    this.marks = {};
    this.marks[`${this.days[0]}`] = this.trade_cal[this.days[0]];
    this.marks[`${this.days[1]}`] = this.trade_cal[this.days[1]];
  }

  fetchData(): void {
    if (!this.selectedAssetCategory || this.selectedPortfolios.length === 0) return;

    this.http
      .get(
        `/view007/asset_category_analysis?asset_category_id=${this.selectedAssetCategory}&portfolio_ids=${this.selectedPortfolios.join(',')}&from_date=${this.trade_cal[this.days[0]]}&to_date=${this.trade_cal[this.days[1]]}`
      )
      .subscribe((result: any) => {
        this.updateChart(result.data, result.trade_cal_range);
      });
  }

  updateChart(data: any, trade_cal_range: any): void {
    const series = [];
    for (const portfolio in data) {
      if (data.hasOwnProperty(portfolio)) {
        series.push({
          name: portfolio,
          type: 'line' as 'line',
          data: data[portfolio]
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
}
