import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthenticationService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const featurePermissions = route.data['allowAcessTo'] || [];
        const featureInclude = this.authService.hasFeatureRightPermission(featurePermissions);
        
        if (!featureInclude) {
            this.router.navigate(['/login']);
        }

        return featureInclude;
    }
}