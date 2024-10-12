import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './cliente.model';
import { environment } from 'src/environments/environment';
import { Page, filterToParamsFormatter, filterToQueryString } from 'src/app/shared/models/page';
import { ApiResponse } from 'src/app/shared/models/apiResponse';
import { ClienteDetails } from './cliente-details.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getAllClientes(pagination: Page): Observable<ApiResponse<Cliente>> {
    const requestBody = {
      search: pagination.filter.search,
      order: pagination.order
    };

    const url = `${environment.apiUrl}clientes/IndexAngular?page=${pagination.page}&pageSize=${pagination.per_page}`;
    return this.http.post<ApiResponse<Cliente>>(url, requestBody);
  }

  getClient(id: number): Observable<ClienteDetails> {
    const url = `${environment.apiUrl}clientes/ApagarAngular?&id=${id}`
    return this.http.get<ClienteDetails>(url, {})
  }

  save(cliente: ClienteDetails): Observable<ClienteDetails> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<ClienteDetails>(`${environment.apiUrl}/clientes`, cliente, httpOptions)
  }

  delete(id: number): Observable<ClienteDetails> {
    const url = `${environment.apiUrl}clientes/ApagarAngular?&id=${id}`
    return this.http.delete<ClienteDetails>(url)
  }
}
