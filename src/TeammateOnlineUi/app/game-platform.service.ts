import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { HttpClientService } from './http-client.service';

import { GamePlatform } from './game-platform';

@Injectable()
export class GamePlatformService {
    private apiUrl = 'http://localhost:20698/api/gameplatforms';

    constructor(public httpClient: HttpClientService) { }

    public getGamePlatforms() {
        return this.httpClient.get(this.apiUrl);
    }
}
