import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { HttpClientService } from '../http-client.service';

import { UserProfile } from './user-profile';

@Injectable()
export class UserProfileService {
    private baseApiUrl = 'http://localhost:20698/api/UserProfiles';

    constructor(public httpClient: HttpClientService) { }

    public findByEmailAddress(emailAddress: string) {
        let apiUrl = this.getCollectionUrl() + '?emailAddress=' + emailAddress;

        return this.httpClient.get(apiUrl);
    }

    public getUserProfile(userId: number): Observable<UserProfile> {
        let apiUrl = this.getDetailUrl(userId);

        return this.httpClient.get(apiUrl);
    }

    public updateUserProfile(userId: number, user: UserProfile) {
        let apiUrl = this.getDetailUrl(userId);

        return this.httpClient.put(apiUrl, user);
    }

    private getCollectionUrl(): string {
        return this.baseApiUrl;
    }

    private getDetailUrl(userId: number): string {
        let apiUrl = this.getCollectionUrl();
        apiUrl = apiUrl + '/' + userId.toString();

        return apiUrl;
    }
}
