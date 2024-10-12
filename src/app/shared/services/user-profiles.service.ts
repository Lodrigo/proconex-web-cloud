import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root'})

export class UserProfileService {

    constructor(private http: HttpClient) {};
    user: User;

    getUserProfile(token: string): Observable<User> {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        
        return this.http.get<User>(`${environment.apiUrl}/user/profile`, { headers })
    }
}
