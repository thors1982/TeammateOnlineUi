import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { OidcManagerService } from '../oidc-manager.service';
import { GamePlatformService } from '../game-platform.service';
import { GameAccountService } from  './game-account.service';

import { GameAccount } from './game-account';
import { GamePlatform } from '../game-platform';

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
        private _gamePlatformService: GamePlatformService,
        private _gameAccountService: GameAccountService) {
    }

    private getGamePlatforms() {
        this._gamePlatformService.getGamePlatforms().subscribe((gp: GamePlatform[]) => this.gamePlatforms = gp);
    }

    private addGameAccount() {
        this._gameAccountService.createGameAccount(this.oidcManagerService.OidcManager.profile.sub, this.gameAccount)
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
