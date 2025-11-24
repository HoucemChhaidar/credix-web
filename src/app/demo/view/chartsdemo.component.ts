import {Component, OnInit, OnDestroy} from '@angular/core';
import {BreadcrumbService} from '../../breadcrumb.service';
import {Subscription} from 'rxjs';
import {AppConfig} from '../domain/appconfig';
import {ConfigService} from '../service/app.config.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';


@Component({
    templateUrl: './chartsdemo.component.html'
})
export class ChartsDemoComponent implements OnInit, OnDestroy {

    lineData: any;

    barData: any;

    pieData: any;

    polarData: any;

    radarData: any;

    overviewStats: any;

    doughnutData: any;

    lineOptions: any;

    barOptions: any;

    pieOptions: any;

    polarOptions: any;

    radarOptions: any;

    config: AppConfig;

    subscription: Subscription;

    constructor(private breadcrumbService: BreadcrumbService, public configService: ConfigService, private http: HttpClient) {
        this.breadcrumbService.setItems([
            {label: 'UI Kit'},
            {label: 'Charts', routerLink: ['/uikit/button']}
        ]);
    }

    ngOnInit() {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
            this.updateChartOptions();
        });

        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        this.http.get<any>(`${environment.apiUrl}/analytics/dashboard`, { headers }).subscribe(res => {
            const data = res.data;
            this.overviewStats = data.overviewStats;
            // Line chart: creditDistributionOverTime
            this.lineData = {
                labels: data.creditDistributionOverTime.labels,
                datasets: data.creditDistributionOverTime.datasets.map((ds: any, i: number) => ({
                    label: ds.label,
                    data: ds.data,
                    fill: false,
                    backgroundColor: i === 0 ? '#2f4860' : '#00bb7e',
                    borderColor: i === 0 ? '#2f4860' : '#00bb7e',
                    tension: .4
                }))
            };
            // Bar chart: monthlyComparison
            this.barData = {
                labels: data.monthlyComparison.labels,
                datasets: data.monthlyComparison.datasets.map((ds: any, i: number) => ({
                    label: ds.label,
                    backgroundColor: i === 0 ? '#2f4860' : '#00bb7e',
                    data: ds.data
                }))
            };
            // Pie chart: activeStatusDistribution
            this.pieData = {
                labels: data.activeStatusDistribution.labels,
                datasets: [
                    {
                        data: data.activeStatusDistribution.data,
                        backgroundColor: [
                            '#00bb7e',
                            '#FF6384'
                        ],
                        hoverBackgroundColor: [
                            '#00bb7e',
                            '#FF6384'
                        ]
                    }
                ]
            };
            // Doughnut chart: same data as pie chart
            this.doughnutData = {
                labels: data.activeStatusDistribution.labels,
                datasets: [
                    {
                        data: data.activeStatusDistribution.data,
                        backgroundColor: [
                            '#00bb7e',
                            '#FF6384'
                        ],
                        hoverBackgroundColor: [
                            '#00bb7e',
                            '#FF6384'
                        ]
                    }
                ]
            };
            // Polar & Radar: placeholder (à adapter si l'API évolue)
            this.polarData = this.pieData;
            this.radarData = this.lineData;
            this.updateChartOptions();
        });
    }

    updateChartOptions() {
        if (this.config.dark)
            this.applyDarkTheme();
        else
            this.applyLightTheme();
    }

    applyLightTheme() {
        this.lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color:  '#ebedef',
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color:  '#ebedef',
                    }
                },
            }
        };

        this.barOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color:  '#ebedef',
                    }
                },
                y: {
                    ticks: {
                        color: '#495057'
                    },
                    grid: {
                        color:  '#ebedef',
                    }
                },
            }
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            }
        };

        this.polarOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

        this.radarOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#495057'
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: '#ebedef'
                    }
                }
            }
        };

    }

    applyDarkTheme() {
        this.lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
            }
        };

        this.barOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
                y: {
                    ticks: {
                        color: '#ebedef'
                    },
                    grid: {
                        color:  'rgba(160, 167, 181, .3)',
                    }
                },
            }
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            }
        };

        this.polarOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                }
            }
        };

        this.radarOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: '#ebedef'
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: 'rgba(160, 167, 181, .3)'
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
