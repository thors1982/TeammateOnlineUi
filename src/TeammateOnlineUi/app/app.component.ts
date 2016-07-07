import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from 'angular2/router';

import {DashboardComponent} from './dashboard.component';
import {FriendsCollectionComponent} from './friends-collection.component';
import {GameAccountsCollectionComponent} from './game-accounts-collection.component';
import {GameAccountComponent} from './game-account.component';
import {UserProfileComponent} from './user-profile.component';
import {SearchUserProfilesComponent} from './search-user-profiles.component';

import {OidcManagerService} from './oidc-manager.service';
import {HttpClientService} from './http-client.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app.html',

    directives: [ROUTER_DIRECTIVES],

    providers: [ROUTER_PROVIDERS, HttpClientService],
})

@RouteConfig([
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: DashboardComponent,
            useAsDefault: true
        },
        {
            path: '/friends',
            name: 'FriendsCollection',
            component: FriendsCollectionComponent,
        },
        {
            path: '/game-accounts',
            name: 'GameAccountsCollection',
            component: GameAccountsCollectionComponent
        },
        {
            path: '/user-profile',
            name: 'UserProfile',
            component: UserProfileComponent
        },
        {
            path: '/game-accounts/:id',
            name: 'GameAccount',
            component: GameAccountComponent
        },
        {
            path: '/search',
            name: 'SearchUserProfiles',
            component: SearchUserProfilesComponent
        },
        {
            path: '/search:searchText',
            name: 'SearchUserProfiles',
            component: SearchUserProfilesComponent
        }
    ])

export class AppComponent implements OnInit {
    public title = 'Teammate Online';
    
    public OidcManager: any;

    public globalSearchText: string;

    constructor(public oidcManagerService: OidcManagerService, public router: Router) { }

    public globalSearchSave() {
        this.router.navigate(['/SearchUserProfiles', { searchText: this.globalSearchText }]);

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
