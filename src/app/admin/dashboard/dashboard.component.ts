import {Component, OnInit} from '@angular/core';
import {PlaceholderService} from '../../services/placeholder.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    dashboardData: any = {};
    recentTransactions: any[] = [];

    constructor(private placeholderService: PlaceholderService) {
    }

    ngOnInit(): void {
        this.loadDashboardData();
    }

    loadDashboardData(): void {
        this.placeholderService.getDashboardData().subscribe(data => {
            this.dashboardData = data;
        });

        this.placeholderService.getRecentTransactions().subscribe(transactions => {
            this.recentTransactions = transactions;
        });
    }
}
