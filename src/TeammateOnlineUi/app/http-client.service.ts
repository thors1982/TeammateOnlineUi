import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, Request, RequestMethod } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { OidcManagerService } from './oidc-manager.service';

import { UserProfile } from './user-profile/user-profile';

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
            .catch(this.handleError);
    }

    public put(url: string, data: any) {
        return this.http.put(url, JSON.stringify(data), {
            headers: this.getHeaders()
        })
            //.map(res => res.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    public delete(url: string) {
        return this.http.delete(url, {
            headers: this.getHeaders()
        })
            //.map(res => res.json())
            .do(data => console.log(data))
            .catch(this.handleError);
    }

    private getHeaders() {
        let header = new Headers();
        header.append('Authorization', 'Bearer ' + this.oidcManagerService.OidcManager.access_token);
        header.append('Content-Type', 'application/ json');

        return header;
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead

        return Observable.throw(errMsg);
    }
}
