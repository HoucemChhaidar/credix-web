import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private token = localStorage.getItem('token') || null;
    private apiUrl = `${environment.authUrl}/login`;

    constructor(private http: HttpClient, private router:Router) { }

    getUsers() {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
        });

        return this.http.get<any[]>(`${environment.apiUrl}/users`, { headers }).toPromise();
    }
    async userLogin() {
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
    });

    try {
        const response = await lastValueFrom(this.http.get<{status:number, message:string, data:any}>(`${environment.apiUrl}/users/me`, { headers }));

        if (response && response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data; // tu renvoies directement l'objet user
    } catch (error) {
        console.error('Erreur lors de la récupération de l’utilisateur', error);
        return null;
    }
    }


    createUser(user: any): Promise<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json',
        });
        return this.http.post(`${environment.apiUrl}/users`, user, { headers }).toPromise();
    }

    async login(email: string, password: string): Promise<any> {


        const payload = { email, password };
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });    
        const response: any = await this.http.post(this.apiUrl, payload, { headers }).toPromise();

            if (response ) {
                this.token = response.data.token;
                localStorage.setItem('token', this.token);
                return response;
            }
        
    }

    /**
     * Déconnexion
     */
    logout() {
        this.token = null;
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    /**
     * Vérifie si l'utilisateur est connecté
     */
    isLoggedIn(): boolean {
        return !!this.token;
    }

}
