import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

import {HttpClientService} from './http-client.service';

import {GameAccount} from './game-account';

@Injectable()
export class GameAccountsCollectionService {
    private baseApiUrl = 'http://localhost:20698/api/UserProfiles/';

    constructor(public httpClient: HttpClientService) { }

    public getGameAccounts(userId: string) {
        let apiUrl = this.baseApiUrl + userId + '/GameAccounts';

        return this.httpClient.get(apiUrl);
    }

    public createGameAccount(userId: string, gameAccount: GameAccount) {
        let apiUrl = this.baseApiUrl + userId + '/GameAccounts';

        gameAccount.UserProfileId = +userId;

        return this.httpClient.post(apiUrl, gameAccount);
    }

    public getAccount(userId: string, gameAccountId: string) {
        let apiUrl = this.baseApiUrl + userId + '/GameAccounts/' + gameAccountId;

        return this.httpClient.get(apiUrl);
    }

    public updateAccount(userId: string, gameAccountId: string, gameAccount: GameAccount) {
        let apiUrl = this.baseApiUrl + userId + '/GameAccounts/' + gameAccountId;

        return this.httpClient.put(apiUrl, gameAccount);
    }
}
