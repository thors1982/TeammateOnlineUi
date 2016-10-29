import { Injectable } from '@angular/core';

import { HttpClientService } from '../http-client.service';

@Injectable()
export class SearchService {
  private baseApiUrl = 'http://localhost:20698/api/Search';

  constructor(public httpClient: HttpClientService) { }

  public query(query: string) {
    let apiUrl = this.getCollectionUrl() + '?query=' + query;

    return this.httpClient.get(apiUrl);
  }

  private getCollectionUrl(): string {
    return this.baseApiUrl;
  }
}
