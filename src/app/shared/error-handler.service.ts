import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { NotificationService } from './services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private router: Router,
    private notification: NotificationService,
  ) { }

  handleHttpError(error: HttpErrorResponse, messageCustom?: string) {
    if (error.status === 401) {
      this.notification.showErrorMessage("Usuário não autorizado");
      this.router.navigate(['/login']);
    } else if (error.status === 400) {
      this.notification.showErrorMessage(messageCustom ?? error.message);
    } else if (error.status === 500) {
      this.notification.showErrorMessage(messageCustom ?? error.message);
    } else if (error.status === 0) {
      this.notification.showErrorMessage("Ocorreu um erro durante o processamento ou um erro de conexão. Por favor verifique sua conexão com a internet e tente novamente.");
    } else if (error.status === 404) {
      this.notification.showErrorMessage(messageCustom ?? error.message);
    } else if (error.status === 403) {
      this.notification.showErrorMessage("Você pode ter saído da sua sessão. Por favor faça login novamente");
    } else {
      this.notification.showErrorMessage(messageCustom ?? error.message);
    }
    return throwError(error);
  }
}