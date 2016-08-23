import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { HttpClientService } from '../http-client.service';

import { Friend } from './friend';

@Injectable()
export class FriendService {
    private baseApiUrl = 'http://localhost:20698/api/UserProfiles/';

    constructor(public httpClient: HttpClientService) { }

    public getFriends(userId: number) {
        let apiUrl = this.getCollectionUrl(userId);

        return this.httpClient.get(apiUrl);
    }

    public createFriend(userId: number, friend: Friend) {
        let apiUrl = this.getCollectionUrl(userId);

        return this.httpClient.post(apiUrl, friend);
    }

    public getFriend(userId: number, friendId: number) {
        let apiUrl = this.getDetailUrl(userId, friendId);

        return this.httpClient.get(apiUrl);
    }

    private getCollectionUrl(userId: number): string {
        let apiUrl = this.baseApiUrl;
        apiUrl = apiUrl + userId.toString() + '/Friends';

        return apiUrl;
    }

    private getDetailUrl(userId: number, friendId: number): string {
        let apiUrl = this.getCollectionUrl(userId);
        apiUrl = apiUrl + '/' + friendId.toString()

        return apiUrl;
    }
}
