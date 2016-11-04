import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OidcManagerService } from '../oidc-manager.service';
import { GamePlatformService } from '../game-platform.service';
import { GameAccountService } from  './game-account.service';
import { FriendService } from '../friends/friend.service';
import { FriendsAccountsService } from './friends-accounts.service';
import { AlertMessageService } from '../alert-message.service';

import { GameAccount } from './game-account';
import { GamePlatform } from '../game-platform';
import { Friend } from '../friends/friend';

@Component({
  templateUrl: 'friends-accounts.html',

  providers: [GamePlatformService, GameAccountService, FriendService, FriendsAccountsService],
})

export class FriendsAccountsComponent implements OnInit {
  public gameAccount: GameAccount;
  public gamePlatforms: GamePlatform[];
  public friends: Friend[];
  public friendsAccounts: GameAccount[];

  constructor(
    public oidcManagerService: OidcManagerService,
    public router: Router,
    private _activatedRoute: ActivatedRoute,
    private _gamePlatformService: GamePlatformService,
    private _gameAccountService: GameAccountService,
    private _friendService: FriendService,
    private _friendsAccountsService: FriendsAccountsService,
    private alertMessageService: AlertMessageService) {
  }

  private getGamePlatforms() {
    this._gamePlatformService.getGamePlatforms()
      .subscribe(
        (gp: GamePlatform[]) => this.gamePlatforms = gp,
        error => this.alertMessageService.addMessage('error', <any>error)
      );
  }

  private getGameAccount() {
    this._activatedRoute.params.subscribe(params => {
      //let id = Number.parseInt(params['id']);
      let id = params['id'];

      this._gameAccountService.getAccount(this.oidcManagerService.OidcManager.profile.sub, +id)
        .subscribe(
          gameAccount => this.gameAccount = gameAccount,
          error => this.alertMessageService.addMessage('error', <any>error)
        );
    });
  }

  private getFriends() {
    this._friendService.getFriends(this.oidcManagerService.OidcManager.profile.sub)
      .subscribe(
        friends => this.friends = friends,
        error => this.alertMessageService.addMessage('error', <any>error)
      );
  }

  private getFriendsAccounts() {
    this._activatedRoute.params.subscribe(params => {
      //let id = Number.parseInt(params['id']);
      let id = params['id'];

      this._friendsAccountsService.getFriendsAccounts(this.oidcManagerService.OidcManager.profile.sub, +id)
        .subscribe(
          friendsAccounts => this.friendsAccounts = friendsAccounts,
          error => this.alertMessageService.addMessage('error', <any>error)
        );
    });
  }

  public viewFriendDetail(friendId: number) {
    this.router.navigate(['/friendsgames', friendId.toString()]);
  }

  public ngOnInit() {
    this.getGameAccount();
    this.getGamePlatforms();
    this.getFriends();
    this.getFriendsAccounts();
  }
}
