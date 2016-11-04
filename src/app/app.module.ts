import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth.component';
import { GravatarComponent } from './gravatar/gravatar.component';
import { DashboardComponent }  from './dashboard/dashboard.component';
import { FriendsCollectionComponent } from './friends/friends-collection.component';
import { FriendGameAccountsCollectionComponent } from './friends/friend-game-accounts-collection.component';
import { GameAccountsCollectionComponent } from './game-accounts/game-accounts-collection.component';
import { GameAccountComponent } from './game-accounts/game-account.component';
import { FriendsAccountsComponent } from './game-accounts/friends-accounts.component';
import { AddGameAccountFormComponent } from './game-accounts/add-game-account-form.component';
import { SearchComponent } from './search/search.component';
import { SearchFormComponent } from './search/search-form.component';
import { UserProfileComponent }  from './user-profile/user-profile.component';
import { UserProfileFormComponent } from './user-profile/user-profile-form.component';

import { OidcManagerService } from './oidc-manager.service';
import { HttpClientService } from './http-client.service';
import { AuthorizationGuard } from './authorization.guard';
import { AlertMessageService } from './alert-message.service';
import { GamePlatformService } from './game-platform.service';

import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    GravatarComponent,
    DashboardComponent,
    FriendsCollectionComponent,
    FriendGameAccountsCollectionComponent,
    GameAccountsCollectionComponent,
    GameAccountComponent,
    FriendsAccountsComponent,
    AddGameAccountFormComponent,
    SearchComponent,
    SearchFormComponent,
    UserProfileComponent,
    UserProfileFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    MaterialModule.forRoot()
  ],
  providers: [
    OidcManagerService,
    HttpClientService,
    AuthorizationGuard,
    AlertMessageService,
    GamePlatformService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
