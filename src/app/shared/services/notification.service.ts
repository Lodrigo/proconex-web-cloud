import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  showSuccessMessage(message: string) {
    Swal.fire('Success!', message, 'success');
  }

  showErrorMessage(message: string) {
    Swal.fire('Error!', message, 'error');
  }

  showWarningMessage(message: string) {
    Swal.fire('Warning!', message, 'warning');
  }

  showInfoMessage(message: string) {
    Swal.fire('Info', message, 'info');
  }

  showSuccessMessageWithTime(message: string, timer: number) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: timer
    });
  }
}
