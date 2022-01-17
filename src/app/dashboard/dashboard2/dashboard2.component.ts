import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexMarkers,
  ApexXAxis,
  ApexPlotOptions
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  labels: string[];
  stroke: any; // ApexStroke;
  markers: ApexMarkers;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

export type smallBarChart = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.scss']
})
export class Dashboard2Component implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public smallBarChart: any;
  public sampleData = [
    31,
    40,
    28,
    44,
    60,
    55,
    68,
    51,
    42,
    85,
    77,
    31,
    40,
    28,
    44,
    60,
    55
  ];
  constructor() {
    this.chart1();
    this.smallChart();
  }

  // Banner chart 1 start
  public bannerChartOptions1 = {
    responsive: true,
    tooltips: {
      enabled: true
    },
    legend: {
      display: false,
      position: 'top',
      labels: {
        usePointStyle: true
      }
    },
    scales: {
      xAxes: [
        {
          display: false,
          gridLines: {
            display: false,
            drawBorder: false
          },
          scaleLabel: {
            display: false,
            labelString: 'Month'
          }
        }
      ],
      yAxes: [
        {
          display: false,
          gridLines: {
            display: false,
            drawBorder: false
          },
          scaleLabel: {
            display: true,
            labelString: 'Value'
          }
        }
      ]
    },
    title: {
      display: false
    }
  };
  bannerChartData1 = [
    {
      data: [28, 35, 36, 48, 46, 42, 60],
      backgroundColor: 'rgba(255,164,34,0.32)',
      borderColor: '#F4A52E',
      borderWidth: 3,
      strokeColor: '#F4A52E',
      capBezierPoints: !0,
      pointColor: '#F4A52E',
      pointBorderColor: '#F4A52E',
      pointBackgroundColor: '#F4A52E',
      pointBorderWidth: 3,
      pointRadius: 4,
      pointHoverBackgroundColor: '#F4A52E',
      pointHoverBorderColor: '#F4A52E',
      pointHoverRadius: 7
    }
  ];

  bannerChartLabels1 = ['2010', '2011', '2012', '2013', '2014', '2015', '2016'];

  // Banner chart 1 end

  // Banner chart 2 start
  public bannerChartOptions2 = {
    responsive: true,
    tooltips: {
      enabled: true
    },
    legend: {
      display: false,
      position: 'top',
      labels: {
        usePointStyle: true
      }
    },
    scales: {
      xAxes: [
        {
          display: false,
          gridLines: {
            display: false,
            drawBorder: false
          },
          scaleLabel: {
            display: false,
            labelString: 'Month'
          }
        }
      ],
      yAxes: [
        {
          display: false,
          gridLines: {
            display: false,
            drawBorder: false
          },
          scaleLabel: {
            display: true,
            labelString: 'Value'
          }
        }
      ]
    },
    title: {
      display: false
    }
  };
  bannerChartData2 = [
    {
      data: [28, 35, 36, 48, 46, 42, 60],
      backgroundColor: 'rgba(0,175,240,0.32)',
      borderColor: '#50AAED',
      borderWidth: 3,
      strokeColor: '#50AAED',
      capBezierPoints: !0,
      pointColor: '#50AAED',
      pointBorderColor: '#50AAED',
      pointBackgroundColor: '#50AAED',
      pointBorderWidth: 3,
      pointRadius: 4,
      pointHoverBackgroundColor: '#50AAED',
      pointHoverBorderColor: '#50AAED',
      pointHoverRadius: 7
    }
  ];

  bannerChartLabels2 = ['2010', '2011', '2012', '2013', '2014', '2015', '2016'];

  // Banner chart 2 end

  // Banner chart 3 start
  public bannerChartOptions3 = {
    responsive: true,
    tooltips: {
      enabled: true
    },
    legend: {
      display: false,
      position: 'top',
      labels: {
        usePointStyle: true
      }
    },
    scales: {
      xAxes: [
        {
          display: false,
          gridLines: {
            display: false,
            drawBorder: false
          },
          scaleLabel: {
            display: false,
            labelString: 'Month'
          }
        }
      ],
      yAxes: [
        {
          display: false,
          gridLines: {
            display: false,
            drawBorder: false
          },
          scaleLabel: {
            display: true,
            labelString: 'Value'
          }
        }
      ]
    },
    title: {
      display: false
    }
  };
  bannerChartData3 = [
    {
      data: [28, 35, 36, 48, 46, 42, 60],
      backgroundColor: 'rgba(156,39,176,0.32)',
      borderColor: '#A668FD',
      borderWidth: 3,
      strokeColor: '#A668FD',
      capBezierPoints: !0,
      pointColor: '#A668FD',
      pointBorderColor: '#A668FD',
      pointBackgroundColor: '#A668FD',
      pointBorderWidth: 3,
      pointRadius: 4,
      pointHoverBackgroundColor: '#A668FD',
      pointHoverBorderColor: '#A668FD',
      pointHoverRadius: 7
    }
  ];

  bannerChartLabels3 = ['2010', '2011', '2012', '2013', '2014', '2015', '2016'];

  // Banner chart 3 end

  // Banner chart 4 start
  public bannerChartOptions4 = {
    responsive: true,
    tooltips: {
      enabled: true
    },
    legend: {
      display: false,
      position: 'top',
      labels: {
        usePointStyle: true
      }
    },
    scales: {
      xAxes: [
        {
          display: false,
          gridLines: {
            display: false,
            drawBorder: false
          },
          scaleLabel: {
            display: false,
            labelString: 'Month'
          }
        }
      ],
      yAxes: [
        {
          display: false,
          gridLines: {
            display: false,
            drawBorder: false
          },
          scaleLabel: {
            display: true,
            labelString: 'Value'
          }
        }
      ]
    },
    title: {
      display: false
    }
  };
  bannerChartData4 = [
    {
      data: [28, 35, 36, 48, 46, 42, 60],
      backgroundColor: 'rgba(113,216,117,0.32)',
      borderColor: '#77DC77',
      borderWidth: 3,
      strokeColor: '#77DC77',
      // capBezierPoints: !0,
      pointColor: '#77DC77',
      pointBorderColor: '#77DC77',
      pointBackgroundColor: '#77DC77',
      pointBorderWidth: 3,
      pointRadius: 4,
      pointHoverBackgroundColor: '#77DC77',
      pointHoverBorderColor: '#77DC77',
      pointHoverRadius: 7
    }
  ];

  bannerChartLabels4 = ['2010', '2011', '2012', '2013', '2014', '2015', '2016'];

  // Banner chart 4 end

  // Banner chart 5 start
  public bannerChartOptions5 = {
    responsive: true,
    tooltips: {
      enabled: true
    },
    legend: {
      display: false,
      position: 'top',
      labels: {
        usePointStyle: true
      }
    },
    scales: {
      xAxes: [
        {
          display: false,
          gridLines: {
            display: false,
            drawBorder: false
          },
          scaleLabel: {
            display: false,
            labelString: 'Month'
          }
        }
      ],
      yAxes: [
        {
          display: false,
          gridLines: {
            display: false,
            drawBorder: false
          },
          scaleLabel: {
            display: true,
            labelString: 'Value'
          }
        }
      ]
    },
    title: {
      display: false
    }
  };
  bannerChartData5 = [
    {
      data: [28, 35, 36, 48, 46, 42, 60],
      backgroundColor: 'rgba(113,216,117,0.32)',
      borderColor: '#77DC77',
      borderWidth: 3,
      strokeColor: '#77DC77',
      pointColor: '#77DC77',
      pointBorderColor: '#77DC77',
      pointBackgroundColor: '#77DC77',
      pointBorderWidth: 3,
      pointRadius: 5,
      pointHoverBackgroundColor: '#77DC77',
      pointHoverBorderColor: '#77DC77',
      pointHoverRadius: 7
    }
  ];

  bannerChartLabels5 = ['2010', '2011', '2012', '2013', '2014', '2015', '2016'];

  // Banner chart 5 end

  private chart1() {
    this.chartOptions = {
      series: [
        {
          name: 'Project A',
          type: 'column',
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
        },
        {
          name: 'Project B',
          type: 'area',
          data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
        },
        {
          name: 'Project C',
          type: 'line',
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
        toolbar: {
          show: false
        },
        foreColor: '#9aa0ac'
      },
      stroke: {
        width: [0, 2, 5],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },

      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: 'vertical',
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels: [
        '01/01/2003',
        '02/01/2003',
        '03/01/2003',
        '04/01/2003',
        '05/01/2003',
        '06/01/2003',
        '07/01/2003',
        '08/01/2003',
        '09/01/2003',
        '10/01/2003',
        '11/01/2003'
      ],
      markers: {
        size: 0
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        title: {
          text: 'dollers'
        },
        min: 0
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== 'undefined') {
              return y.toFixed(0) + ' dollers';
            }
            return y;
          }
        }
      }
    };
  }
  private smallChart() {
    this.smallBarChart = {
      chart: {
        type: 'bar',
        width: 200,
        height: 50,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '40%'
        }
      },
      series: [
        {
          name: 'income',
          data: this.sampleData
        }
      ],
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {},
        marker: {
          show: false
        }
      }
    };
  }
  ngOnInit() {}
}
