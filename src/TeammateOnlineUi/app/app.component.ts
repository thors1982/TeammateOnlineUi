import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { OidcManagerService } from './oidc-manager.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app.html',
})

export class AppComponent {
    public OidcManager: any;

    public globalSearchText: string;

    constructor(private oidcManagerService: OidcManagerService, private router: Router) { }

    public globalSearchSave() {
        this.router.navigate(['/search', { searchText: this.globalSearchText }]);

        this.globalSearchText = '';
    }

    public ngOnInit() {
        this.oidcManagerService.checkForOauthCallback();
    }
    
    public logout() {
        this.oidcManagerService.logout();
    }

    public loginWithGoogle() {
        this.oidcManagerService.loginWithGoogle();
    }

    public loginWithFacebook() {
        this.oidcManagerService.loginWithFacebook();
    }
}
