import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { OidcManagerService } from './oidc-manager.service';
import { AlertMessageService } from './alert-message.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app.html',

    providers: [AlertMessageService]
})

export class AppComponent {
    public globalSearchText: string;

    constructor(private oidcManagerService: OidcManagerService, private router: Router, private alertMessageService: AlertMessageService) { }

    public globalSearchSave() {
        this.router.navigate(['/search', { searchText: this.globalSearchText }]);

        this.globalSearchText = '';
    }

    public ngOnInit() {
    }
}
