import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OidcManagerService } from '../oidc-manager.service';
import { FriendService } from './friend.service';
import { GamePlatformService } from '../game-platform.service';
import { GameAccountService } from '../game-accounts/game-account.service';

import { GameAccount } from '../game-accounts/game-account';
import { GamePlatform } from '../game-platform';
import { Friend } from './friend';

@Component({
    templateUrl: 'friend-game-accounts-collection.html',

    providers: [FriendService, GamePlatformService, GameAccountService],
})

export class FriendGameAccountsCollectionComponent implements OnInit {
    constructor(
        public oidcManagerService: OidcManagerService,
        private _activatedRoute: ActivatedRoute,
        private _friendService: FriendService,
        private _gamePlatformService: GamePlatformService,
        private _gameAccountService: GameAccountService) {
    }

    public friend: Friend;

    public friendsGameAccounts: GameAccount[];
    public gamePlatforms: GamePlatform[];

    public errorMessage: string = '';

    private getFriend(friendId: number) {
        this._friendService.getFriend(this.oidcManagerService.OidcManager.profile.sub, friendId)
            .subscribe(f => this.friend = f,
            error => this.errorMessage = <any>error,
            () => this.getGameAccounts());
    }

    private getGamePlatforms() {
        this._gamePlatformService.getGamePlatforms().subscribe((gp: GamePlatform[]) => this.gamePlatforms = gp);
    }

    private getGameAccounts() {
        this._gameAccountService.getGameAccounts(this.friend.friendUserProfile.id)
            .subscribe(
            gameAccounts => this.friendsGameAccounts = gameAccounts,
            error => this.errorMessage = <any>error
            );
    }

    public ngOnInit() {
        this._activatedRoute.params.subscribe(params => {
            let friendId = Number.parseInt(params['id']);

            this.getFriend(+friendId);
        });

        this.getGamePlatforms();
    }
}
