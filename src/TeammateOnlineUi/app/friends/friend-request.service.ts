import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

import {HttpClientService} from '../http-client.service';

import {FriendRequest} from './friend-request';

@Injectable()
export class FriendRequestService {
    private baseApiUrl = 'http://localhost:20698/api/UserProfiles/';

    constructor(public httpClient: HttpClientService) { }

    public getFriendRequests(userId: string) {
        let apiUrl = this.baseApiUrl + userId + '/FriendRequests';

        return this.httpClient.get(apiUrl);
    }

    public createFriendRequest(userId: string, friendRequest: FriendRequest) {
        let apiUrl = this.baseApiUrl + userId + '/FriendRequests';

        return this.httpClient.post(apiUrl, friendRequest);
    }

    public updateFriendRequest(userId: string, friendRequest: FriendRequest) {
        let apiUrl = this.baseApiUrl + userId + '/FriendRequests/' + String(friendRequest.id);

        return this.httpClient.put(apiUrl, friendRequest);
    }
    
    public deleteFriendRequest(userId: string, friendRequestId: number) {
        let apiUrl = this.baseApiUrl + userId + '/FriendRequests/' + String(friendRequestId);

        return this.httpClient.delete(apiUrl);
    }
}
