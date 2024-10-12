import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { ClienteDetails } from '../cliente-details.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  cliente: ClienteDetails;
  clientForm: FormGroup;
  isDisabled: boolean;
  id: number;
  actionType: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private notification: NotificationService,
    private errorHandleService: ErrorHandlerService,
  ) { }

  ngOnInit(): void {
    this.mountForm();
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.actionType = params['actionType'];
      this.isDisabled = this.verifyIsDisabled(this.actionType);
    });

    if (this.id) {
      this.getCliente();
    }
  }

  mountForm(): void {
    this.clientForm = this.formBuilder.group({
      bairro: [null],
      cep: [null],
      complemento: [null],
      cpf: [null],
      email: [null],
      estado: [null],
      id: [null],
      municipio: [null],
      municipioId: [null],
      nascimento: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      numero: [null],
      rg: [null],
      sexo: [null, [Validators.required]],
      telefone: [null],
      telefone2: [null],
      telefone3: [null]
    })
  }

  verifyIsDisabled(actionType: string): boolean {
    if (actionType === "edit" || actionType === "create")
      return false;
    else
      return true;
  }

  getCliente(): void {
    this.clienteService.getClient(this.id).subscribe({
      next: (response: ClienteDetails) => {
        this.cliente = response;
        this.clientForm.patchValue(this.cliente);
        if (this.isDisabled)
          this.clientForm.disable();
      },
      error: (error) => {
        this.errorHandleService.handleHttpError(error)
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

  returnClientesList() {
    this.router.navigate(['/clientes']);
  }

  submit(): void {
    if (this.clientForm.valid) {
      this.clienteService.save(this.clientForm.value).subscribe({
        next: () => {
          this.notification.showSuccessMessageWithTime("Cadastro realizado com sucesso!", 1500);
          this.spinner.hide();
        },
        error: (error) => {
          this.notification.showErrorMessage("Um erro ocorreu enquanto estava cadastrando um cliente");
          this.spinner.hide();
        },
        complete: () => {
          this.spinner.hide();
        }
      });
    }
  }

  textVoltarOrCancel() {
    return this.actionType == "details" ? "Voltar" : "Cancelar";
  }

  clienteEdit(): void {
    this.actionType = "create";
    this.clientForm.enable();
  }

  delete() {
    this.clienteService.delete(this.id).subscribe({
      next: () => {
        this.notification.showSuccessMessageWithTime("Cadastro realizado com sucesso!", 1500);
        this.spinner.hide();
      },
      error: (error) => {
        this.notification.showErrorMessage("Um erro ocorreu enquanto estava cadastrando um cliente");
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      }
    })
  }
}
