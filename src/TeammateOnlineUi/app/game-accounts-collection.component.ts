import {Component, OnInit} from 'angular2/core';

import {GameAccountComponent} from './game-account.component';
import {AddGameAccountFormComponent} from './add-game-account-form.component';

import {OidcManagerService} from './oidc-manager.service';
import {GamePlatformsCollectionService} from './game-platforms-collection.service';
import {GameAccountsCollectionService} from './game-accounts-collection.service';

import {GameAccount} from './game-account';
import {GamePlatform} from './game-platform';

@Component({
    templateUrl: 'game-accounts-collection.html',

    directives: [GameAccountComponent, AddGameAccountFormComponent],

    providers: [GamePlatformsCollectionService, GameAccountsCollectionService]
})

export class GameAccountsCollectionComponent implements OnInit {
    constructor(
        public oidcManagerService: OidcManagerService,
        private _gamePlatformsCollectionService: GamePlatformsCollectionService,
        private _gameAccountsCollectionService: GameAccountsCollectionService) {
    }

    public userProfileGameAccounts: GameAccount[];
    public gamePlatforms: GamePlatform[];

    public errorMessage: string = '';

    public selectedGameAccount: GameAccount;

    public isAddingAccount: boolean;

    public newGameAccount: GameAccount;

    private getGamePlatforms() {
        this._gamePlatformsCollectionService.getGamePlatforms().subscribe((gp: GamePlatform[]) => this.gamePlatforms = gp);
    }

    private getGameAccounts() {
        this._gameAccountsCollectionService.getGameAccounts(this.oidcManagerService.OidcManager.profile.sub)
            .subscribe(
            gameAccounts => this.userProfileGameAccounts = gameAccounts,
            error => this.errorMessage = <any>error
            );
    }

    public ngOnInit() {
        this.isAddingAccount = false;
        this.getGamePlatforms();
        this.getGameAccounts();
    }
    
    public selectGameAccount(gameAccount: GameAccount) {
        this.selectedGameAccount = gameAccount;
    }

    public addGameAccount() {
        this.isAddingAccount = true;
    }
}
