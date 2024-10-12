import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { UserProconex } from '../models/user';
import { UserProfileService } from '../services/user-profiles.service';
import { ErrorHandlerService } from '../error-handler.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { loginUser } from 'src/app/components/login/login.model';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/components/manage-user/user.service';
import { UserPermission } from 'src/app/components/user/enums/user-type';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<UserProconex> = new BehaviorSubject<UserProconex>({} as UserProconex);
    public currentUser$: Observable<UserProconex> = this.currentUserSubject.asObservable();

    public userPermissions: string;

    private readonly _destroying$ = new Subject<void>();
    private isLoginInProgress = false;

    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor(
        private router: Router,
        private errorHandler: ErrorHandlerService,
        private spinner: NgxSpinnerService,
        private http: HttpClient,
        private userService: UserService
    ) {
        this.initAuth();
    }

    public get currentUserValue(): UserProconex {
        return this.currentUserSubject.value;
    }

    public initAuth(): void {
        const currentUserStorage = localStorage.getItem('currentUser') ?? "";

        if (currentUserStorage) {
            this.isAuthenticatedSubject.next(true);
            const UserProconex = JSON.parse(currentUserStorage) as UserProconex;
            this.currentUserSubject.next(UserProconex)
        }
    }

    loginPopup() {
        if (this.isLoginInProgress) {
            return;
        }

        this.isLoginInProgress = true;
    }

    private updateIsAuthenticated() {
        // const isAuthenticated = !!this.msalService.instance.getActiveAccount();
        // this.isAuthenticatedSubject.next(isAuthenticated);
    }

    login(loginUser: loginUser): void {
        this.userService.getUser(loginUser).subscribe({
            next: (response: UserProconex) => {
                localStorage.setItem('authenticated', 'true');
                localStorage.setItem('currentUser',  JSON.stringify(response));
                this.currentUserSubject.next(response);
                this.isAuthenticatedSubject.next(true);
                this.router.navigate(['/home']);
            },
            error: (error) => {
                localStorage.removeItem('authenticated');
                this.isAuthenticatedSubject.next(false);
            }
        });
    }

    loginRedirect() {
        if (this.isLoginInProgress) {
            return;
        }

        this.isLoginInProgress = true;
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('accessToken');
        return !!token;
    }

    logout(): void {
            this.clearLocalStorageAndSession();
            this.router.navigate(['/login']);
    }

    clearLocalStorageAndSession() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authenticated');
    }

    ngOnDestroy(): void {
        this._destroying$.next();
        this._destroying$.complete();
    }

    hasFeatureRightPermission(permissions: string[]) {
        this.currentUserSubject.subscribe({
            next: (userPermissions: UserProconex) => {
                this.userPermissions = UserPermission[userPermissions.perfil];
            }
        })

        if(!this.userPermissions) {
            return false;
        }

        return !!permissions.find((permission) => this.userPermissions.includes(permission))
    }
}
