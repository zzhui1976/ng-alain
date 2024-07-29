import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { EChartsOption } from 'echarts';
import { NzMarks } from 'ng-zorro-antd/slider';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'app-fund-equity-analysis',
  standalone: true,
  imports: [SharedModule],
  template: `
    <nz-card [nzBordered]="false" nzTitle="投资权益类资产分析">
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

      <nz-tabset [(nzSelectedIndex)]="selectedIndex" (nzSelectedIndexChange)="tabChange($event)">
        @for (fund of funds; track $index) {
          <nz-tab [nzTitle]="fund.name">
            <div class="px-lg">
              @if (fund.show) {
                <div nz-row>
                  <div nz-col nzSpan="12">
                    <div echarts [options]="pieOptions" style="height: 300px;"></div>
                  </div>
                  <div nz-col nzSpan="12">
                    <div echarts [options]="barOptions" style="height: 300px;"></div>
                  </div>
                </div>
                <div nz-row>
                  <div nz-col nzSpan="12">
                    <div echarts [options]="pieOptionsIndustry" style="height: 300px;"></div>
                  </div>
                  <div nz-col nzSpan="12">
                    <div echarts [options]="barOptionsIndustry" style="height: 300px;"></div>
                  </div>
                </div>
              }
            </div>
          </nz-tab>
        }
      </nz-tabset>
    </nz-card>
  `
})
export class FundEquityAnalysisComponent implements OnInit {
  chartOption: EChartsOption = {};
  pieOptions: EChartsOption = {};
  barOptions: EChartsOption = {};
  pieOptionsIndustry: EChartsOption = {};
  barOptionsIndustry: EChartsOption = {};

  marks: NzMarks = {};
  days = [0, 0];
  slider_len = 1;
  trade_cal = [];
  funds: any[] = [];
  selectedIndex = 0;

  cal_formatter = (value: number): string => {
    return `${this.trade_cal[value]} [${value - this.slider_len + 1}]`;
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get(`/view004/trade_cal`).subscribe((result: any) => {
      this.trade_cal = result.trade_cal;
      this.slider_len = this.trade_cal.length;
      this.days = [this.slider_len - 30, this.slider_len - 1];

      this.updateSliderMarker();

      this.fetchData();
    });
  }

  fetchData(): void {
    this.http
      .get(`/view004/funds?from_date=${this.trade_cal[this.days[0]]}&to_date=${this.trade_cal[this.days[1]]}`)
      .subscribe((result: any) => {
        this.funds = result.data.map((fund: any) => ({ name: fund.name, show: true }));
        this.updateCharts(result.data);
      });
  }

  updateSliderMarker(): void {
    this.marks = {};
    this.marks[`${this.days[0]}`] = this.trade_cal[this.days[0]];
    this.marks[`${this.days[1]}`] = this.trade_cal[this.days[1]];
  }

  updateCharts(data: any): void {
    const fund = data[this.selectedIndex];
    this.pieOptions = {
      series: [
        {
          name: '权益类资产占比',
          type: 'pie',
          data: fund.equityAssets
        }
      ]
    };
    this.barOptions = {
      series: [
        {
          name: '起初期末占比',
          type: 'bar',
          data: fund.startEndAssets
        }
      ]
    };
    this.pieOptionsIndustry = {
      series: [
        {
          name: '行业占比',
          type: 'pie',
          data: fund.industryAssets
        }
      ]
    };
    this.barOptionsIndustry = {
      series: [
        {
          name: '起初期末行业占比',
          type: 'bar',
          data: fund.startEndIndustryAssets
        }
      ]
    };
  }

  onDaysChange(days: number[] | number): void {
    this.updateSliderMarker();
    this.fetchData();
  }

  tabChange(index: number): void {
    this.selectedIndex = index;
    this.fetchData();
  }
}
