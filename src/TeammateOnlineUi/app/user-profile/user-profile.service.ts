import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

import {HttpClientService} from '../http-client.service';

import {UserProfile} from './user-profile';

@Injectable()
export class UserProfileService {
    private baseApiUrl = 'http://localhost:20698/api/UserProfiles/';

    constructor(public httpClient: HttpClientService) { }

    public getUserProfile(id: string): Observable<UserProfile> {
        let apiUrl = this.baseApiUrl + id;

        return this.httpClient.get(apiUrl);
    }

    public updateUserProfile(id: string, user: UserProfile) {
        let apiUrl = this.baseApiUrl + id;
        
        return this.httpClient.put(apiUrl, user);
    }
}
