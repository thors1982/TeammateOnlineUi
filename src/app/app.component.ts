import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OidcManagerService } from './oidc-manager.service';
import { AlertMessageService } from './alert-message.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  public globalSearchText: string;

  constructor(private oidcManagerService: OidcManagerService, private router: Router, private alertMessageService: AlertMessageService) { }

  public globalSearchSave() {
    this.router.navigate(['/search', { searchText: this.globalSearchText }]);

    this.globalSearchText = '';
  }

  public ngOnInit() {
  }
}
