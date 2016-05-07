import {Injectable} from 'angular2/core';
import {Http, Response, RequestOptions, Headers, Request, RequestMethod} from 'angular2/http';
import {Observable} from 'rxjs/Rx';

import {OidcManagerService} from './oidc-manager.service';

import {UserProfile} from './user-profile';

@Injectable()
export class HttpClientService {

    constructor(public oidcManagerService: OidcManagerService, public http: Http) { }

    public get(url: string) {
        return this.http.get(url, {
            headers: this.getHeaders()
            })
            .map((response: Response) => response.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    public post(url: string, data: any) {
        return this.http.post(url, JSON.stringify(data), {
            headers: this.getHeaders()
            })
            .map(res => res.json())
            .do(data => console.log(data))
            .catch(this.handleError)
            .subscribe();
    }

    public put(url: string, data: any) {
        return this.http.put(url, JSON.stringify(data), {
            headers: this.getHeaders()
            })
            .map(res => res.json())
            .do(data => console.log(data))
            .catch(this.handleError)
            .subscribe();
    }

    public delete(url: string) {
        return this.http.delete(url, {
            headers: this.getHeaders()
            })
            .map(res => res.json())
            .do(data => console.log(data))
            .catch(this.handleError)
            .subscribe();
    }

    private getHeaders() {
        let header = new Headers();
        header.append('Authorization', 'Bearer ' + this.oidcManagerService.OidcManager.access_token);
        header.append('Content-Type', 'application/ json');

        return header;
    }

    private handleError(error: any) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
