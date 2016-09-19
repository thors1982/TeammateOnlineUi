import { Component, OnInit } from '@angular/core';

import { GameAccountComponent } from './game-account.component';
import { AddGameAccountFormComponent } from './add-game-account-form.component';

import { OidcManagerService } from '../oidc-manager.service';
import { GamePlatformService } from '../game-platform.service';
import { GameAccountService } from './game-account.service';
import { AlertMessageService } from '../alert-message.service';

import { GameAccount } from './game-account';
import { GamePlatform } from '../game-platform';

@Component({
    templateUrl: 'game-accounts-collection.html',

    providers: [GamePlatformService, GameAccountService]
})

export class GameAccountsCollectionComponent implements OnInit {
    constructor(
        public oidcManagerService: OidcManagerService,
        private _gamePlatformService: GamePlatformService,
        private _gameAccountService: GameAccountService,
        private alertMessageService: AlertMessageService) {
    }

    public userProfileGameAccounts: GameAccount[];
    public gamePlatforms: GamePlatform[];
    
    public selectedGameAccount: GameAccount;

    public isAddingAccount: boolean;

    public newGameAccount: GameAccount;

    private getGamePlatforms() {
        this._gamePlatformService.getGamePlatforms()
            .subscribe(
            (gp: GamePlatform[]) => this.gamePlatforms = gp,
            error => this.alertMessageService.addMessage('error', <any>error)
            );
    }

    private getGameAccounts() {
        this._gameAccountService.getGameAccounts(this.oidcManagerService.OidcManager.profile.sub)
            .subscribe(
            gameAccounts => this.userProfileGameAccounts = gameAccounts,
            error => this.alertMessageService.addMessage('error', <any>error)
            );
    }

    private deleteGameAccount(gameAccount: GameAccount) {
        this._gameAccountService.deleteAccount(this.oidcManagerService.OidcManager.profile.sub, gameAccount.id)
            .subscribe(
            data => { },
            error => this.alertMessageService.addMessage('error', <any>error),
            () => this.getGameAccounts()
            );
    }

    private clearSelectedGameAccount() {
        this.selectedGameAccount = null;
    }

    public ngOnInit() {
        this.isAddingAccount = false;
        this.getGamePlatforms();
        this.getGameAccounts();
    }

    public selectGameAccount(gameAccount: GameAccount) {
        this.selectedGameAccount = gameAccount;
    }

    public removeGameAccount(gameAccount: GameAccount) {
        this.deleteGameAccount(gameAccount);
    }

    public addGameAccount() {
        this.isAddingAccount = true;
    }
}
