import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PlaceholderService {

    // Mock data for dashboard
    getDashboardData() {
        return of({
            totalUsers: 1250,
            activeToday: 342,
            totalTransactions: 8456,
            totalRevenue: 125430,
            creditBalance: 89450
        });
    }

    // Mock transactions
    getRecentTransactions() {
        return of([
            { id: 1, user: 'John Doe', amount: 150, store: 'Store A', status: 'Completed' },
            { id: 2, user: 'Jane Smith', amount: 75, store: 'Store B', status: 'Completed' },
            { id: 3, user: 'Bob Wilson', amount: 200, store: 'Store C', status: 'Pending' }
        ]);
    }

    // Empty implementations for any remaining demo service calls
    getCountries() { return of([]); }
    getCustomers() { return of([]); }
    getEvents() { return of([]); }
    getNodes() { return of([]); }
    getProducts() { return of([]); }
    getPhotos() { return of([]); }
    getIcons() { return of([]); }
}
