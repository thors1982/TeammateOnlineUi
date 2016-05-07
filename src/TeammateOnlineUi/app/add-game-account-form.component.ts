import {Component, OnInit} from 'angular2/core';
import {NgForm} from 'angular2/common';

import {OidcManagerService} from './oidc-manager.service';
import {GamePlatformsCollectionService} from './game-platforms-collection.service';
import {GameAccountsCollectionService} from  './game-accounts-collection.service';

import {GameAccount} from './game-account';
import {GamePlatform} from './game-platform';

@Component({
    selector: 'add-game-account-form',
    templateUrl: 'add-game-account-form.html',
})

export class AddGameAccountFormComponent implements OnInit {
    public gameAccount: GameAccount;
    public gamePlatforms: GamePlatform[];

    public errorMessage: string = '';

    constructor(
        public oidcManagerService: OidcManagerService,
        private _gamePlatformsCollectionService: GamePlatformsCollectionService,
        private _gameAccountsCollectionService: GameAccountsCollectionService) {
    }

    private getGamePlatforms() {
        this._gamePlatformsCollectionService.getGamePlatforms().subscribe((gp: GamePlatform[]) => this.gamePlatforms = gp);
    }

    private addGameAccount() {
        this._gameAccountsCollectionService.createGameAccount(this.oidcManagerService.OidcManager.profile.sub, this.gameAccount);
    }

    public addAccountSave() {
        this.addGameAccount();
    }

    public ngOnInit() {
        this.getGamePlatforms();

        this.gameAccount = <GameAccount>{};
    }
}
