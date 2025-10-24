import { Component } from '@angular/core';
import { UserService } from '../demo/service/user.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
  providers: [MessageService],
})
export class AppLoginComponent {

  dark: boolean = false;       // Thème par défaut
  checked: boolean = false;    // "Remember me"
  email: string = '';
  password: string = '';

  submitted: boolean = false;

  constructor(private authService: UserService, private router: Router ,private messageService:MessageService) {}
async login() {

  // 1️⃣ Vérification des champs requis
  if (!this.email || !this.password) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Champs requis',
      detail: 'Email et mot de passe sont obligatoires'
    });
    return;
  }

  try {
    const result = await this.authService.login(this.email, this.password);
    this.authService.userLogin()

    if (result && result.data.token) {
      this.messageService.add({
        severity: 'success',
        summary: 'Connexion réussie',
        detail: 'Bienvenue !'
      });

      this.router.navigate(['/pages/users']);
    } else {
      // 4️⃣ Token non reçu
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Impossible de récupérer le token'
      });
    }
  } catch (error: any) {
    console.error('Erreur login:', error);

    if (error.status === 401) {
      this.messageService.add({
        severity: 'error',
        summary: 'Échec de connexion',
        detail: 'Email ou mot de passe invalide'
      });
    } else if (error.status === 403) {
      this.messageService.add({
        severity: 'error',
        summary: 'Accès refusé',
        detail: 'Vous n’avez pas les droits pour vous connecter'
      });
    } else if (!navigator.onLine) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur réseau',
        detail: 'Vérifiez votre connexion internet'
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur serveur',
        detail: error.error?.message || 'Une erreur est survenue, réessayez plus tard'
      });
    }
  }
}

}
