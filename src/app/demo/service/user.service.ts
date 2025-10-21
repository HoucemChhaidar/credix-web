import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private token = 'eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJockBibHVlc2t5LmNvbSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc2MTA0NTcyMiwiZXhwIjoxNzYxMTMyMTIyfQ.XsrzzYJyS4tzVN6mKGxclvmFQulPjTmUyFvxggZYfb6vxVYeBJl6Q_AKAbGrbSIp';

    constructor(private http: HttpClient) {}

    getUsers() {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
        });

        return this.http.get<any[]>(`${environment.apiUrl}/users`, { headers }).toPromise();
    }
}
