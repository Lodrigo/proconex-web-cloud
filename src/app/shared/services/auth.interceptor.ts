// auth.interceptor.ts

import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const access_token = localStorage.getItem('accessToken') ?? '';

        const authRequest = request.clone({
            headers: new HttpHeaders({
                'Authorization': `Bearer ${access_token}`,
            }),
        });

        return next.handle(authRequest);
    }
}
