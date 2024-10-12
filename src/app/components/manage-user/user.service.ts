import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User, UserProconex } from 'src/app/shared/models/user';
import { UserResponse } from './user-response';
import { Page } from 'src/app/shared/models/page';
import { loginUser } from '../login/login.model';

@Injectable({ providedIn: 'root' })

export class UserService {
    constructor(private http: HttpClient) { };
    user: User[];

    getAllUsers(pagination: Page): Observable<UserResponse> {
        const url = `${environment.apiUrl}/user/filter?page=${pagination.page}&pageSize=${pagination.per_page}`;
        return this.http.post<UserResponse>(url, {})
    }

    save(user: User): Observable<User> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<User>(`${environment.apiUrl}/user`, user, httpOptions)
    }

    getUser(loginUser: loginUser): Observable<UserProconex> {
        return this.http.post<UserProconex>(`${environment.apiUrl}Autenticacao/LoginAngular`, loginUser);
    }
}
