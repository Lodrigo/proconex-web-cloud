import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/guards/authentication.service';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/shared/reactive-form-validations/generic-form-validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  // Validations
  validationMessages: ValidationMessages;
  genericValidator: GenericValidator;
  displayMessage: DisplayMessage = {};

  constructor(private formBuilder: FormBuilder,
    private authentication: AuthenticationService) {
    this.validationMessages = {
      Email: {
        Email: 'Informe o seu e-mail.'
      },
      Senha: {
        Senha: 'Informe a sua senha'
      }
    }

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.authentication.initAuth();
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
       Email: ['', [Validators.email]],
       Senha: [''],
       UrlRetorno: ['/']
    });
  }

  onSubmit() {
    this.authentication.login(this.loginForm.value);
  }
}
