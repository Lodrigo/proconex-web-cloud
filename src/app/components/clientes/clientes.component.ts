import { Component, OnInit } from '@angular/core';
import { SelectionType, TableColumn } from '@swimlane/ngx-datatable';
import { ClienteService } from './cliente.service';
import { Cliente } from './cliente.model';
import { Page } from 'src/app/shared/models/page';
import { ApiResponse } from 'src/app/shared/models/apiResponse';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ErrorHandlerService } from 'src/app/shared/error-handler.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  rows: Cliente;
  columns: TableColumn[] = [
    { name: "Nome", prop: "nome" },
    { name: "Sexo", prop: "sexo", sortable: false },
    { name: "Nascimento", prop: "nascimento" },
    { name: "Telefone", prop: "telefone" },
  ];

  page: Page = new Page
  selected = [];
  SelectionType = SelectionType;
  filterClientForm: FormGroup;

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private errorHandleService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.mountPagination({ offset: 0 });
    this.mountFilterClientForm();
    this.getAllClientes();
  }

  getAllClientes(): void {
    this.page.filter = this.filterClientForm.value;
    this.clienteService.getAllClientes(this.page).subscribe({
      next: (response: ApiResponse<Cliente>) => {
        this.rows = response.content;
        this.page.total = response.total;
      },
      error: (error) => {
        this.errorHandleService.handleHttpError(error)
        this.spinner.hide();
      },
      complete: () => { this.spinner.hide(); }
    })
  }

  onAddOrSelect(cliente: any): void {
    const id =cliente.selected[0].id;
    this.clientDetails(id, "details");
  }

  clientDetails(id: number | null, actionType: string): void {
    this.router.navigate(['/clientes-detalhes'], { queryParams: { id: id, actionType: actionType } });
  }

  mountPagination(pageInfo: any): void {
    this.page.page = pageInfo.offset + 1;
    this.page.per_page = 3;
    this.page.total = 0;
    this.page.messages = { emptyMessage: 'No records found', totalMessage: 'total' }
  }

  mountFilterClientForm(){
    this.filterClientForm = this.formBuilder.group({
      search: ['']
    });
  }

  sort(data: any): void {
    const { sorts } = data;
    this.page = { ...this.page, order: `${sorts[0].prop} ${sorts[0].dir}` };
    this.getAllClientes();
  }

  setPage(pageInfo: any): void {
    this.page.page = pageInfo.offset + 1;
    this.getAllClientes();
  }
}
