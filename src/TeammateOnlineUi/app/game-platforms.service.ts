import {Injectable} from 'angular2/core';
import {Http, Response, RequestOptions, Headers, Request, RequestMethod} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

import {GamePlatform} from './game-platform';

@Injectable()
export class GamePlatformsService {
    private apiUrl = 'http://localhost:20698/api/gameplatforms';
    
    constructor(public http: Http) { }

    public getGamePlatforms() {
        return this.http.get(this.apiUrl)
            .map((response: Response) => <GamePlatform[]>response.json())
            .do((data: any) => console.log(data))
            .catch(this.handleError);
    }

    private handleError(error: any) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
