import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
      private token = localStorage.getItem('token') || null;


  constructor(private http: HttpClient) { }

  getWallet() { 
     const headers = new HttpHeaders({
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            });
    
    return this.http.get<any[]>(`${environment.apiUrl}/wallets/admin`, { headers }).toPromise();
  }
}
