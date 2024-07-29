import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SharedModule } from '@shared';
import { EChartsOption } from 'echarts';
import { NzMarks } from 'ng-zorro-antd/slider';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'app-fixed-income-analysis',
  standalone: true,
  imports: [SharedModule],
  template: `
    <nz-card [nzBordered]="false" nzTitle="投资固定收益类资产分析">
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
                    <div echarts [options]="pieOptionsTop" style="height: 300px;"></div>
                  </div>
                  <div nz-col nzSpan="12">
                    <div echarts [options]="pieOptionsIndustry" style="height: 300px;"></div>
                  </div>
                </div>
                <div nz-row>
                  <div nz-col nzSpan="12">
                    <div echarts [options]="pieOptionsRisk" style="height: 300px;"></div>
                  </div>
                  <div nz-col nzSpan="12">
                    <div echarts [options]="pieOptionsDuration" style="height: 300px;"></div>
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
export class FixedIncomeAnalysisComponent implements OnInit {
  pieOptionsTop: EChartsOption = {};
  pieOptionsIndustry: EChartsOption = {};
  pieOptionsRisk: EChartsOption = {};
  pieOptionsDuration: EChartsOption = {};

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
    this.http.get(`/view005/trade_cal`).subscribe((result: any) => {
      this.trade_cal = result.trade_cal;
      this.slider_len = this.trade_cal.length;
      this.days = [this.slider_len - 30, this.slider_len - 1];

      this.updateSliderMarker();

      this.fetchData();
    });
  }

  fetchData(): void {
    this.http
      .get(`/view005/funds?from_date=${this.trade_cal[this.days[0]]}&to_date=${this.trade_cal[this.days[1]]}`)
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
    this.pieOptionsTop = {
      title: {
        text: '固收类十大重仓及其他'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: '固收类十大重仓及其他',
          type: 'pie',
          data: fund.topAssets
        }
      ]
    };
    this.pieOptionsIndustry = {
      title: {
        text: '固收类资产所属行业占比'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: '固收类资产所属行业占比',
          type: 'pie',
          data: fund.industryAssets
        }
      ]
    };
    this.pieOptionsRisk = {
      title: {
        text: '固收类资产按照风险（高中低）三类资产占比'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: '固收类资产按照风险（高中低）三类资产占比',
          type: 'pie',
          data: fund.riskAssets
        }
      ]
    };
    this.pieOptionsDuration = {
      title: {
        text: '固收类资产按照久期（长中短）三类资产占比'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: '固收类资产按照久期（长中短）三类资产占比',
          type: 'pie',
          data: fund.durationAssets
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
