import {Component, OnInit} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from 'angular2/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {FriendsCollectionComponent} from './friends/friends-collection.component';
import {FriendGameAccountsCollectionComponent} from './friends/friend-game-accounts-collection.component';
import {GameAccountsCollectionComponent} from './game-accounts/game-accounts-collection.component';
import {GameAccountComponent} from './game-accounts/game-account.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {SearchComponent} from './search/search.component';

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
            path: '/friendsgames/:id',
            name: 'FriendGameAccountsCollection',
            component: FriendGameAccountsCollectionComponent
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
            name: 'Search',
            component: SearchComponent
        },
        {
            path: '/search:searchText',
            name: 'Search',
            component: SearchComponent
        }
    ])

export class AppComponent implements OnInit {
    public title = 'Teammate Online';
    
    public OidcManager: any;

    public globalSearchText: string;

    constructor(public oidcManagerService: OidcManagerService, public router: Router) { }

    public globalSearchSave() {
        this.router.navigate(['/Search', { searchText: this.globalSearchText }]);

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
