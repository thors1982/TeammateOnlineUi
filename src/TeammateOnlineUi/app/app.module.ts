import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GravatarComponent } from './gravatar.component';
import { DashboardComponent }  from './dashboard/dashboard.component';
import { UserProfileComponent }  from './user-profile/user-profile.component';
import { UserProfileFormComponent } from './user-profile/user-profile-form.component';
import { GameAccountsCollectionComponent } from './game-accounts/game-accounts-collection.component';
import { GameAccountComponent } from './game-accounts/game-account.component';
import { FriendsCollectionComponent } from './friends/friends-collection.component';
import { FriendGameAccountsCollectionComponent } from './friends/friend-game-accounts-collection.component';
import { SearchComponent } from './search/search.component';
import { AuthComponent } from './auth.component';

import { OidcManagerService } from './oidc-manager.service';
import { HttpClientService } from './http-client.service';
import { AuthorizationGuard } from './authorization.guard';

import { routing } from './app.routing';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,

        GravatarComponent,

        DashboardComponent,
        UserProfileComponent,
        UserProfileFormComponent,
        GameAccountsCollectionComponent,
        GameAccountComponent,
        FriendsCollectionComponent,
        FriendGameAccountsCollectionComponent,
        SearchComponent,
        AuthComponent
    ],
    providers: [
        OidcManagerService,
        HttpClientService,
        AuthorizationGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
