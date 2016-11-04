import { Injectable } from '@angular/core';

import { HttpClientService } from '../http-client.service';

import { GameAccount } from './game-account';

@Injectable()
export class FriendsAccountsService {
  private baseApiUrl = 'http://localhost:20698/api/UserProfiles/';

  constructor(public httpClient: HttpClientService) { }

  public getFriendsAccounts(userId: number, gameAccountId: number) {
    let apiUrl = this.getCollectionUrl(userId, gameAccountId);

    return this.httpClient.get(apiUrl);
  }

  private getCollectionUrl(userId: number, gameAccountId: number): string {
    let apiUrl = this.baseApiUrl;
    apiUrl = apiUrl + userId.toString() + '/GameAccounts/' + gameAccountId.toString() + '/FriendsAccounts';

    return apiUrl;
  }
}
