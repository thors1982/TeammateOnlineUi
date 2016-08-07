import {Component, OnInit, Input, Output, EventEmitter} from 'angular2/core';
import {NgForm} from 'angular2/common';

import {OidcManagerService} from '../oidc-manager.service';
import {GamePlatformsService} from '../game-platforms.service';
import {GameAccountsCollectionService} from  './game-accounts-collection.service';

import {GameAccount} from './game-account';
import {GamePlatform} from '../game-platform';

@Component({
    selector: 'add-game-account-form',
    templateUrl: 'add-game-account-form.html',
})

export class AddGameAccountFormComponent implements OnInit {
    public gameAccount: GameAccount;
    public gamePlatforms: GamePlatform[];

    @Output()
    getGameAccounts = new EventEmitter();

    public errorMessage: string = '';

    constructor(
        public oidcManagerService: OidcManagerService,
        private _gamePlatformsService: GamePlatformsService,
        private _gameAccountsCollectionService: GameAccountsCollectionService) {
    }

    private getGamePlatforms() {
        this._gamePlatformsService.getGamePlatforms().subscribe((gp: GamePlatform[]) => this.gamePlatforms = gp);
    }

    private addGameAccount() {
        this._gameAccountsCollectionService.createGameAccount(this.oidcManagerService.OidcManager.profile.sub, this.gameAccount)
            .subscribe(
            data => { },
            error => this.errorMessage = <any>error,
            () => this.sendEventToGetAccounts()
        );
    }

    private sendEventToGetAccounts() {
        this.getGameAccounts.emit({});
    }

    public addAccountSave() {
        this.addGameAccount();
        this.gameAccount.gamePlatformId = null;
        this.gameAccount.userName = '';
    }

    public ngOnInit() {
        this.getGamePlatforms();

        this.gameAccount = <GameAccount>{};
    }
}
