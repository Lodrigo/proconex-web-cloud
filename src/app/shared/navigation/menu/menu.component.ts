import { Component } from '@angular/core';
import { MenuItem } from './model/menu-item.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  nav: MenuItem[] = [
    {
      link: '/home',
      name: 'home',
      exact: false,
      featureRightRequired: ['Administrativo', 'Medico'],
      icon: 'bi bi-house-door'
    },
    {
      link: '/user-list',
      name: 'user list',
      exact: false,
      featureRightRequired: ['Administrativo', 'Medico'],
      icon: 'bi bi-people-fill'
    }
  ]
}
