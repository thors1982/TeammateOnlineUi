import {Component, OnInit} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {RouteParams} from 'angular2/router';

import {OidcManagerService} from './oidc-manager.service';
import {GamePlatformsCollectionService} from './game-platforms-collection.service';
import {GameAccountsCollectionService} from  './game-accounts-collection.service';

import {GameAccount} from './game-account';
import {GamePlatform} from './game-platform';

@Component({
    selector: 'game-account',
    templateUrl: 'game-account.html',

    inputs: ['gameAccount'],
})

export class GameAccountComponent implements OnInit {
    public gameAccount: GameAccount;
    public gamePlatforms: GamePlatform[];

    public errorMessage: string = '';

    constructor(
        public oidcManagerService: OidcManagerService,
        private _gamePlatformsCollectionService: GamePlatformsCollectionService,
        private _gameAccountsCollectionService: GameAccountsCollectionService,
        private _routeParams: RouteParams) {
    }

    private getGamePlatforms() {
        this._gamePlatformsCollectionService.getGamePlatforms().subscribe((gp: GamePlatform[]) => this.gamePlatforms = gp);
    }

    private getGameAccount() {
        let id = +this._routeParams.get('id');
        
        this._gameAccountsCollectionService.getAccount(this.oidcManagerService.OidcManager.profile.sub, id.toString())
            .subscribe(
            gameAccount => this.gameAccount = gameAccount,
            error => this.errorMessage = <any>error
        );
    }

    private updateGameAccount() {
        this._gameAccountsCollectionService.updateAccount(this.oidcManagerService.OidcManager.profile.sub, this.gameAccount.id.toString(), this.gameAccount);
    }

    public gameAccountSave() {
        this.updateGameAccount();
    }

    public ngOnInit() {
        this.getGamePlatforms();
    }
}
