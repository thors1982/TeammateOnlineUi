import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

import {HttpClientService} from '../http-client.service';

import {FriendRequest} from './friend-request';

@Injectable()
export class FriendRequestService {
    private baseApiUrl = 'http://localhost:20698/api/UserProfiles/';

    constructor(public httpClient: HttpClientService) { }

    public getFriendRequests(userId: number) {
        let apiUrl = this.getCollectionUrl(userId);

        return this.httpClient.get(apiUrl);
    }

    public createFriendRequest(userId: number, friendRequest: FriendRequest) {
        let apiUrl = this.getCollectionUrl(userId);

        return this.httpClient.post(apiUrl, friendRequest);
    }

    public updateFriendRequest(userId: number, friendRequest: FriendRequest) {
        let apiUrl = this.getDetailUrl(userId, friendRequest.id);

        return this.httpClient.put(apiUrl, friendRequest);
    }
    
    public deleteFriendRequest(userId: number, friendRequestId: number) {
        let apiUrl = this.getDetailUrl(userId, friendRequestId);

        return this.httpClient.delete(apiUrl);
    }

    private getCollectionUrl(userId: number): string {
        let apiUrl = this.baseApiUrl;
        apiUrl = apiUrl + userId.toString() + '/FriendRequests';

        return apiUrl;
    }

    private getDetailUrl(userId: number, friendRequestId: number): string {
        let apiUrl = this.getCollectionUrl(userId);
        apiUrl = apiUrl + '/' + friendRequestId.toString()

        return apiUrl;
    }
}
