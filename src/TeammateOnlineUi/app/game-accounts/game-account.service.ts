import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { HttpClientService } from '../http-client.service';

import { GameAccount } from './game-account';

@Injectable()
export class GameAccountService {
    private baseApiUrl = 'http://localhost:20698/api/UserProfiles/';

    constructor(public httpClient: HttpClientService) { }

    public getGameAccounts(userId: number) {
        let apiUrl = this.getCollectionUrl(userId);

        return this.httpClient.get(apiUrl);
    }

    public createGameAccount(userId: number, gameAccount: GameAccount) {
        let apiUrl = this.getCollectionUrl(userId);

        gameAccount.userProfileId = +userId;

        return this.httpClient.post(apiUrl, gameAccount);
    }

    public getAccount(userId: number, gameAccountId: number) {
        let apiUrl = this.getDetailUrl(userId, gameAccountId);

        return this.httpClient.get(apiUrl);
    }

    public updateAccount(userId: number, gameAccountId: number, gameAccount: GameAccount) {
        let apiUrl = this.getDetailUrl(userId, gameAccountId);

        return this.httpClient.put(apiUrl, gameAccount);
    }

    public deleteAccount(userId: number, gameAccountId: number) {
        let apiUrl = this.getDetailUrl(userId, gameAccountId);

        return this.httpClient.delete(apiUrl);
    }

    private getCollectionUrl(userId: number): string {
        let apiUrl = this.baseApiUrl;
        apiUrl = apiUrl + userId.toString() + '/GameAccounts';

        return apiUrl;
    }

    private getDetailUrl(userId: number, gameAccountId: number): string {
        let apiUrl = this.getCollectionUrl(userId);
        apiUrl = apiUrl + '/' + gameAccountId.toString()

        return apiUrl;
    }
}
