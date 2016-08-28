import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OidcManagerService } from './oidc-manager.service';

@Component({
    template: ''
})

export class AuthComponent implements OnInit {
    
    constructor(private oidcManagerService: OidcManagerService, private _activatedRoute: ActivatedRoute) { }

    public ngOnInit() {
        let func = '';
        this._activatedRoute.params.subscribe(params => {
            func = params['func'];
        });

        switch (func) {
            case 'logout':
                this.logout();
                break;
            case 'google-login':
                this.loginWithGoogle();
                break;
            case 'facebook-login':
                this.loginWithFacebook();
                break;
            case 'callback':
                this.callback();
                break;
        }
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

    public callback() {
        this.oidcManagerService.checkForOauthCallback();
    }
}
