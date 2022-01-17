import { Component, ViewChild, OnInit } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexGrid,
  ApexTitleSubtitle,
  ApexPlotOptions,
  ApexTooltip,
  ApexLegend
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('chart', { static: false }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions>;
  constructor() {}

  // area chart start
  public areaChartOptions = {
    responsive: true,
    legend: {
      display: false,
      labels: {
        usePointStyle: true,
        fontFamily: 'Poppins'
      }
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false,
            drawBorder: false
          },
          scaleLabel: {
            display: false,
            labelString: 'Month'
          },
          ticks: {
            fontFamily: 'Poppins',
            fontColor: '#9aa0ac' // Font Color
          }
        }
      ],
      yAxes: [
        {
          display: true,
          gridLines: {
            display: true,
            draw1Border: !1,
            lineWidth: 0.5,
            zeroLineColor: 'transparent',
            drawBorder: false
          },
          scaleLabel: {
            display: true,
            labelString: 'Value',
            fontFamily: 'Poppins'
          },
          ticks: {
            fontFamily: 'Poppins',
            fontColor: '#9aa0ac' // Font Color
          }
        }
      ]
    },
    title: {
      display: false,
      text: 'Normal Legend'
    }
  };
  areaChartData = [
    {
      label: 'Foods',
      data: [0, 105, 190, 140, 270],
      borderWidth: 4,
      pointStyle: 'circle',
      pointRadius: 5,
      borderColor: 'rgba(154, 156, 157, 1)',
      backgroundColor: 'rgba(154, 156, 157, 0.4)',
      pointBackgroundColor: 'rgba(154, 156, 157, 1)',
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: 'transparent',
      pointHoverBorderColor: 'rgba(154, 156, 157,0.8)'
    },
    {
      label: 'Electronics',
      data: [0, 152, 80, 250, 190],
      borderWidth: 4,
      pointStyle: 'circle',
      pointRadius: 5,
      borderColor: 'rgba(76, 194, 176, 1)',
      backgroundColor: 'rgba(76, 194, 176, 0.4)',
      pointBackgroundColor: 'rgba(76, 194, 176, 1)',
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: 'transparent',
      pointHoverBorderColor: 'rgba(76, 194, 176,0.8)'
    }
  ];

  areaChartLabels = ['January', 'February', 'March', 'April', 'May'];
  // area chart end

  // barChart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    legend: {
      display: true,
      labels: {
        fontColor: '#9aa0ac'
      }
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false
          },
          ticks: {
            fontFamily: 'Poppins',
            fontColor: '#9aa0ac' // Font Color
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontFamily: 'Poppins',
            fontColor: '#9aa0ac' // Font Color
          }
        }
      ]
    }
  };
  public barChartLabels: string[] = [
    '2001',
    '2002',
    '2003',
    '2004',
    '2005',
    '2006',
    '2007'
  ];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    { data: [58, 60, 74, 78, 55, 64, 42], label: 'Series A' },
    { data: [30, 45, 51, 22, 79, 35, 82], label: 'Series B' }
  ];

  public barChartColors: Array<any> = [
    {
      backgroundColor: 'rgba(90, 155, 246, 0.8)',
      borderColor: 'rgba(90, 155, 246, 1)',
      pointBackgroundColor: 'rgba(90, 155, 246, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(90, 155, 246, 0.8)'
    },
    {
      backgroundColor: 'rgba(174, 174, 174, 0.8)',
      borderColor: 'rgba(174, 174, 174, 1)',
      pointBackgroundColor: 'rgba(174, 174, 174, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(174, 174, 174, 0.8)'
    }
  ];
  // end bar chart

  ngOnInit() {
    'use strict';
    this.chart1();
    this.chart2();
  }

  // Chart 1
  private chart1() {
    this.chartOptions = {
      series: [
        {
          name: 'High - 2013',
          data: [15, 13, 30, 23, 13, 32, 27]
        },
        {
          name: 'Low - 2013',
          data: [12, 25, 14, 18, 27, 13, 21]
        }
      ],
      chart: {
        height: 250,
        type: 'line',
        foreColor: '#9aa0ac',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      colors: ['#9F78FF', '#858585'],
      stroke: {
        curve: 'smooth'
      },
      grid: {
        borderColor: 'rgba(216, 216, 216, 0.30)',
        row: {
          colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      markers: {
        size: 3
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        title: {
          text: 'Month'
        }
      },
      yaxis: {
        min: 5,
        max: 40
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true
        },
        x: {
          show: true
        }
      }
    };
  }

  // Chart 2
  private chart2() {
    this.chartOptions2 = {
      series: [
        {
          name: 'blue',
          data: [
            {
              x: 'Team A',
              y: [1, 5]
            },
            {
              x: 'Team B',
              y: [4, 6]
            },
            {
              x: 'Team C',
              y: [5, 8]
            }
          ]
        },
        {
          name: 'green',
          data: [
            {
              x: 'Team A',
              y: [2, 6]
            },
            {
              x: 'Team B',
              y: [1, 3]
            },
            {
              x: 'Team C',
              y: [7, 8]
            }
          ]
        }
      ],
      chart: {
        type: 'rangeBar',
        height: 250,
        foreColor: '#9aa0ac'
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      },
      dataLabels: {
        enabled: true
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true
        },
        x: {
          show: true
        }
      }
    };
  }
}
