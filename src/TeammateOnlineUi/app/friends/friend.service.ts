import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

import {HttpClientService} from '../http-client.service';

import {Friend} from './friend';

@Injectable()
export class FriendService {
    private baseApiUrl = 'http://localhost:20698/api/UserProfiles/';

    constructor(public httpClient: HttpClientService) { }

    public getFriend(userId: string, friendId: string) {
        let apiUrl = this.baseApiUrl + userId + '/Friends/' + friendId;

        return this.httpClient.get(apiUrl);
    }

    public getFriends(userId: string) {
        let apiUrl = this.baseApiUrl + userId + '/Friends';

        return this.httpClient.get(apiUrl);
    }

    public createFriend(userId: string, friend: Friend) {
        let apiUrl = this.baseApiUrl + userId + '/Friends';

        return this.httpClient.post(apiUrl, friend);
    }
}
