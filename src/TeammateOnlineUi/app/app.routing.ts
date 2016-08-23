import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent }  from './dashboard/dashboard.component';
import { UserProfileComponent }  from './user-profile/user-profile.component';
import { GameAccountsCollectionComponent } from './game-accounts/game-accounts-collection.component';
import { GameAccountComponent } from './game-accounts/game-account.component';
import { FriendsCollectionComponent } from './friends/friends-collection.component';
import { FriendGameAccountsCollectionComponent } from './friends/friend-game-accounts-collection.component';
import { SearchComponent } from './search/search.component';


const appRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'user-profile',
        component: UserProfileComponent
    },
    {
        path: 'game-accounts',
        component: GameAccountsCollectionComponent
    },
    {
        path: 'game-accounts/:id',
        component: GameAccountComponent
    },
    {
        path: 'friends',
        component: FriendsCollectionComponent,
    },
    {
        path: 'friendsgames/:id',
        component: FriendGameAccountsCollectionComponent
    },
    {
        path: 'search',
        component: SearchComponent
    },
    {
        path: 'search:searchText',
        component: SearchComponent
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
    }
];

export const routing = RouterModule.forRoot(appRoutes);
