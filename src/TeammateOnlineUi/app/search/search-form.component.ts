import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { GravatarComponent} from '../gravatar.component';

import { OidcManagerService } from '../oidc-manager.service';
import { GamePlatformService } from '../game-platform.service';
import { FriendService } from '../friends/friend.service';
import { FriendRequestService } from '../friends/friend-request.service';
import { SearchService } from './search.service';

import { Friend } from '../friends/friend';
import { FriendRequest } from '../friends/friend-request';
import { UserProfile } from '../user-profile/user-profile';
import { Search } from './search';
import { GamePlatform } from '../game-platform';

@Component({
    selector: 'search-form',
    templateUrl: 'search-form.component.html',

    providers: [SearchService, FriendService, GamePlatformService, FriendRequestService]
})

export class SearchFormComponent implements OnInit {
    constructor(private _activatedRoute: ActivatedRoute, public oidcManagerService: OidcManagerService, private _searchService: SearchService, private _gamePlatformService: GamePlatformService, private _friendService: FriendService, private _friendRequestService: FriendRequestService) {

        this._activatedRoute.params.subscribe(params => {
            this.searchText = params['searchText'];
            if (this.searchText != null) {
                this.searchQuery();
            }
        });
    }

    public gamePlatforms: GamePlatform[];

    public completedSearch: Search;

    public errorMessage: string = '';

    public searchText: string = '';

    private getGamePlatforms() {
        this._gamePlatformService.getGamePlatforms().subscribe((gp: GamePlatform[]) => this.gamePlatforms = gp);
    }

    private searchQuery() {
        this._searchService.query(this.searchText).subscribe((s: Search) => this.completedSearch = s);
    }

    private addFriendRequest(newFriendId: number) {
        let newFriendRequest = new FriendRequest();
        newFriendRequest.userProfileId = +this.oidcManagerService.OidcManager.profile.sub;
        newFriendRequest.friendUserProfileId = newFriendId;
        newFriendRequest.isAccepted = false;
        newFriendRequest.isPending = true;

        this._friendRequestService.createFriendRequest(this.oidcManagerService.OidcManager.profile.sub, newFriendRequest)
            .subscribe(
            error => this.errorMessage = <any>error
            );
    }

    public ngOnInit() {
        this.getGamePlatforms();
    }

    public searchTextSave() {
        this.searchQuery();
    }

    public addFriendRequestSave(newFriendsProfileId: number) {
        this.addFriendRequest(newFriendsProfileId);
    }
}
