import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

import {HttpClientService} from './http-client.service';

import {Friend} from './friend';

@Injectable()
export class FriendsCollectionService {
    private baseApiUrl = 'http://localhost:20698/api/UserProfiles/';

    constructor(public httpClient: HttpClientService) { }

    public getFriends(userId: string) {
        let apiUrl = this.baseApiUrl + userId + '/Friends';

        return this.httpClient.get(apiUrl);
    }
}
