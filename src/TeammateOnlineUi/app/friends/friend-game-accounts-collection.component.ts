import {Component, OnInit} from 'angular2/core';
import {RouteParams, RouteData} from 'angular2/router';

import {OidcManagerService} from '../oidc-manager.service';
import {FriendService} from './friend.service';
import {GamePlatformsService} from '../game-platforms.service';
import {GameAccountsCollectionService} from '../game-accounts/game-accounts-collection.service';

import {GameAccount} from '../game-accounts/game-account';
import {GamePlatform} from '../game-platform';
import {Friend} from './friend';

@Component({
    templateUrl: 'friend-game-accounts-collection.html',

    providers: [FriendService, GamePlatformsService, GameAccountsCollectionService],
})

export class FriendGameAccountsCollectionComponent implements OnInit {
    constructor(
        public oidcManagerService: OidcManagerService,
        public params: RouteParams,
        private _friendService: FriendService,
        private _gamePlatformsService: GamePlatformsService,
        private _gameAccountsCollectionService: GameAccountsCollectionService) {
    }

    public friend: Friend;

    public friendsGameAccounts: GameAccount[];
    public gamePlatforms: GamePlatform[];

    public errorMessage: string = '';

    private getFriend(friendId: number) {
        this._friendService.getFriend(this.oidcManagerService.OidcManager.profile.sub, friendId.toString())
            .subscribe(f => this.friend = f,
            error => this.errorMessage = <any>error,
            () => this.getGameAccounts());
    }

    private getGamePlatforms() {
        this._gamePlatformsService.getGamePlatforms().subscribe((gp: GamePlatform[]) => this.gamePlatforms = gp);
    }

    private getGameAccounts() {
        this._gameAccountsCollectionService.getGameAccounts(this.friend.friendUserProfile.id.toString())
            .subscribe(
            gameAccounts => this.friendsGameAccounts = gameAccounts,
            error => this.errorMessage = <any>error
            );
    }

    public ngOnInit() {
        let friendId = this.params.get('id');
        this.getFriend(+friendId);
        this.getGamePlatforms();
    }
}
