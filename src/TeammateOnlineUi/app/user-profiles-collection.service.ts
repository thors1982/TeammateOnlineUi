import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

import {HttpClientService} from './http-client.service';

import {UserProfile} from './user-profile/user-profile';

@Injectable()
export class UserProfilesCollectionService {
    private baseApiUrl = 'http://localhost:20698/api/UserProfiles/';

    constructor(public httpClient: HttpClientService) { }

    public findByEmailAddress(emailAddress: string) {
        let apiUrl = this.baseApiUrl + '?emailAddress=' + emailAddress;

        return this.httpClient.get(apiUrl);
    }
}
