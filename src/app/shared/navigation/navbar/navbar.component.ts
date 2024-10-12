import { Component } from '@angular/core';
import { MenuItem } from '../menu/model/menu-item.model';
import { AuthenticationService } from '../../guards/authentication.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isAuthenticated: boolean = false;
  loggedUserName: string;

  constructor(
    private authService: AuthenticationService,
    private translationService: TranslationService
  ) {
    this.authService.initAuth();
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });

    this.authService.currentUser$.subscribe(user => {
      this.loggedUserName = user.nome;
    })
    this.translationService.setLanguage('en');
  }

  login() {
    this.authService.loginPopup();
  }

  logout() {
    this.authService.logout();
  }

  setLanguage(idiom: string) {
    this.translationService.setLanguage(idiom);
  }

  nav: MenuItem[] = [
    {
      link: '/home',
      name: 'Início',
      exact: false,
      featureRightRequired: ['Administrativo', 'Medico'],
      icon: 'bi bi-house-door'
    },
    {
      link: '/clientes',
      name: 'Clientes',
      exact: false,
      featureRightRequired: ['Administrativo', 'Medico'],
      icon: 'bi bi-people'
    },
    {
      link: '/anamneses',
      name: 'Anamneses',
      exact: false,
      featureRightRequired: ['Administrativo', 'Medico'],
      icon: 'bi bi-people'
    },
    {
      link: '/exames',
      name: 'Exames',
      exact: false,
      featureRightRequired: ['Administrativo', 'Medico'],
      icon: 'bi bi-people'
    },
    {
      link: '/medicos',
      name: 'Médicos',
      exact: false,
      featureRightRequired: ['Administrativo', 'Medico'],
      icon: 'bi bi-people'
    },
    {
      link: '/convenios',
      name: 'Convênios',
      exact: false,
      featureRightRequired: ['Administrativo', 'Medico'],
      icon: 'bi bi-people'
    },
    {
      link: '/usuarios',
      name: 'Usuários',
      exact: false,
      featureRightRequired: ['Administrativo', 'Medico'],
      icon: 'bi bi-people'
    }
  ]

  hasFeatureRightPermission(right: string[]) {
    return this.authService.hasFeatureRightPermission(right);
  }
}
