import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OidcManagerService } from '../oidc-manager.service';
import { GamePlatformService } from '../game-platform.service';
import { GameAccountService } from  './game-account.service';
import { AlertMessageService } from '../alert-message.service';

import { GameAccount } from './game-account';
import { GamePlatform } from '../game-platform';

@Component({
    selector: 'game-account',
    templateUrl: 'game-account.html',

    inputs: ['gameAccount'],
})

export class GameAccountComponent implements OnInit {
    public gameAccount: GameAccount;
    public gamePlatforms: GamePlatform[];

    @Output()
    clearSelectedGameAccount = new EventEmitter();
    
    constructor(
        public oidcManagerService: OidcManagerService,
        private _gamePlatformService: GamePlatformService,
        private _gameAccountService: GameAccountService,
        private _activatedRoute: ActivatedRoute,
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
            let id = Number.parseInt(params['id']);

            this._gameAccountService.getAccount(this.oidcManagerService.OidcManager.profile.sub, id)
                .subscribe(
                gameAccount => this.gameAccount = gameAccount,
                error => this.alertMessageService.addMessage('error', <any>error)
                );
        });
    }

    private updateGameAccount() {
        this._gameAccountService.updateAccount(this.oidcManagerService.OidcManager.profile.sub, +this.gameAccount.id, this.gameAccount)
            .subscribe(
            data => { },
            error => this.alertMessageService.addMessage('error', <any>error),
            () => this.sendEventToGetAccounts()
            );
    }

    private sendEventToGetAccounts() {
        this.clearSelectedGameAccount.emit({});
    }

    public gameAccountSave() {
        this.updateGameAccount();
    }

    public ngOnInit() {
        this.getGamePlatforms();
    }
}
