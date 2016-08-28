import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent }  from './dashboard/dashboard.component';
import { UserProfileComponent }  from './user-profile/user-profile.component';
import { GameAccountsCollectionComponent } from './game-accounts/game-accounts-collection.component';
import { GameAccountComponent } from './game-accounts/game-account.component';
import { FriendsCollectionComponent } from './friends/friends-collection.component';
import { FriendGameAccountsCollectionComponent } from './friends/friend-game-accounts-collection.component';
import { SearchComponent } from './search/search.component';
import { AuthComponent } from './auth.component';

import { AuthorizationGuard } from './authorization.guard';


const appRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'user-profile',
        component: UserProfileComponent,
        canActivate: [AuthorizationGuard]
    },
    {
        path: 'game-accounts',
        component: GameAccountsCollectionComponent,
        canActivate: [AuthorizationGuard]
    },
    {
        path: 'game-accounts/:id',
        component: GameAccountComponent,
        canActivate: [AuthorizationGuard]
    },
    {
        path: 'friends',
        component: FriendsCollectionComponent,
        canActivate: [AuthorizationGuard]
    },
    {
        path: 'friendsgames/:id',
        component: FriendGameAccountsCollectionComponent,
        canActivate: [AuthorizationGuard]
    },
    {
        path: 'search',
        component: SearchComponent,
        canActivate: [AuthorizationGuard]
    },
    {
        path: 'search:searchText',
        component: SearchComponent,
        canActivate: [AuthorizationGuard]
    },
    {
        path: 'auth/:func',
        component: AuthComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
    }
];

export const routing = RouterModule.forRoot(appRoutes);
