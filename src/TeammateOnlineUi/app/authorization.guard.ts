import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { OidcManagerService } from './oidc-manager.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {

    constructor(private oidcManagerService: OidcManagerService, private router: Router) { }

    canActivate() {
        if (this.oidcManagerService.isLoggedIn()) {
            return true;
        }

        // Redirect to dashboard
        this.router.navigate(['/dashboard']);

        return false;
    }
}