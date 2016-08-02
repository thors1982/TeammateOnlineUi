import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Rx';

import {HttpClientService} from './http-client.service';

@Injectable()
export class SearchService {
    private baseApiUrl = 'http://localhost:20698/api/Search/';

    constructor(public httpClient: HttpClientService) { }

    public query(query: string) {
        let apiUrl = this.baseApiUrl + '?query=' + query;

        return this.httpClient.get(apiUrl);
    }
}
