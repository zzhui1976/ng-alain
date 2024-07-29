import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { EChartsOption } from 'echarts';
import { NzMarks } from 'ng-zorro-antd/slider';

@Component({
  selector: 'app-portfolio-analysis',
  standalone: true,
  imports: [SharedModule],
  template: `
    <nz-card [nzBordered]="false" nzTitle="仓位分析（按组合）">
      <div nz-row>
        <div nz-col nzSpan="4">
          <nz-select
            style="width: 150px"
            nzPlaceHolder="选择投资组合"
            [(ngModel)]="selectedPortfolio"
            (ngModelChange)="onPortfolioChange()"
          >
            <nz-option *ngFor="let portfolio of portfolios" [nzLabel]="portfolio.name" [nzValue]="portfolio.id" />
          </nz-select>
        </div>
        <div nz-col nzSpan="12">
          <nz-tree-select
            style="width: 600px"
            [nzCheckStrictly]="true"
            nzPlaceHolder="选择资产分类"
            [nzNodes]="assetTree"
            [(ngModel)]="selectedAssets"
            nzCheckable
            (ngModelChange)="onAssetTreeChange()"
          />
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
export class PortfolioAnalysisComponent implements OnInit {
  chartOption: EChartsOption = {};

  marks: NzMarks = {};

  days = [0, 0];
  slider_len = 1;
  trade_cal = [];

  portfolios: any[] = [];
  selectedPortfolio?: string;
  assetTree: any[] = [];
  selectedAssets: string[] = [];

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
    this.http.get(`/view006/portfolios`).subscribe((result: any) => {
      this.portfolios = result.portfolios;
    });
  }

  fetchAssetTree(): void {
    this.http.get(`/view006/asset_tree`).subscribe((result: any) => {
      this.assetTree = result.assetTree;
    });
  }

  fetchTradeCal(): void {
    this.http.get(`/view006/trade_cal`).subscribe((result: any) => {
      this.trade_cal = result.trade_cal;
      this.slider_len = this.trade_cal.length;
      this.days = [this.slider_len - 30, this.slider_len - 1];
      this.updateSliderMarker();
    });
  }

  onPortfolioChange(): void {
    this.fetchData();
  }

  onAssetTreeChange(): void {
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
    if (!this.selectedPortfolio || this.selectedAssets.length === 0) return;

    this.http
      .get(
        `/view006/portfolio_analysis?portfolio_id=${this.selectedPortfolio}&asset_ids=${this.selectedAssets.join(',')}&from_date=${this.trade_cal[this.days[0]]}&to_date=${this.trade_cal[this.days[1]]}`
      )
      .subscribe((result: any) => {
        this.updateChart(result.data, result.trade_cal_range);
      });
  }

  updateChart(data: any, trade_cal_range: any): void {
    const series = [];
    for (const asset in data) {
      if (data.hasOwnProperty(asset)) {
        series.push({
          name: asset,
          type: 'line' as 'line',
          data: data[asset]
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
