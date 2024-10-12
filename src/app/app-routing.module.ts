import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/navigation/home/home.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClientDetailsComponent } from './components/clientes/client-details/client-details.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
    data: {
      allowAcessTo: ['Administrativo', 'Medico']
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      allowAcessTo: ['Administrativo', 'Medico']
    }
  },
  {
    path: 'clientes',
    component: ClientesComponent,
    canActivate: [AuthGuard],
    data: {
      allowAcessTo: ['Administrativo', 'Medico']
    }
  },
  {
    path: 'clientes-detalhes',
    component: ClientDetailsComponent,
    canActivate: [AuthGuard],
    data: {
      allowAcessTo: ['Administrativo', 'Medico']
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
