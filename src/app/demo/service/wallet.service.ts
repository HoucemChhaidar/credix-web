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

  sendMoney() {
       const headers = new HttpHeaders({
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            });
    return this.http.post(`${environment.apiUrl}/wallets/bulk-transfer`, '', { headers }).toPromise();
  }
  sendMoneyToWallet(walletId: string, amount: number) {
       const headers = new HttpHeaders({
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            });
    const body = { tokenizedId: walletId, amount: amount, description : '' };
    return this.http.post(`${environment.apiUrl}/wallets/add-credit-to-admin`, body, { headers }).toPromise();
  }
}
