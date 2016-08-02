import {Component, OnInit} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {RouteParams, RouteData} from 'angular2/router';

import {GravatarComponent} from './gravatar.component';

import {OidcManagerService} from './oidc-manager.service';
import {GamePlatformsCollectionService} from './game-platforms-collection.service';
import {UserProfilesCollectionService} from './user-profiles-collection.service';
import {FriendsCollectionService} from './friends/friends-collection.service';
import {SearchService} from './search.service';

import {Friend} from './friends/friend';
import {UserProfile} from './user-profile/user-profile';
import {Search} from './search';
import {GamePlatform} from './game-platform';

@Component({
    selector: 'search-form',
    templateUrl: 'search-form.component.html',

    providers: [SearchService, FriendsCollectionService, GamePlatformsCollectionService],

    directives: [GravatarComponent]
})

export class SearchFormComponent implements OnInit {
    constructor(params: RouteParams, data: RouteData, public oidcManagerService: OidcManagerService, private _searchService: SearchService, private _gamePlatformsCollectionService: GamePlatformsCollectionService, private _friendsCollectionService: FriendsCollectionService) {
        this.searchText = params.get('searchText');
        if (this.searchText != null) {
            this.searchQuery();
        }
    }

    public gamePlatforms: GamePlatform[];

    public completedSearch: Search;

    public errorMessage: string = '';

    public searchText: string = '';

    private getGamePlatforms() {
        this._gamePlatformsCollectionService.getGamePlatforms().subscribe((gp: GamePlatform[]) => this.gamePlatforms = gp);
    }

    private searchQuery() {
        this._searchService.query(this.searchText).subscribe((s: Search) => this.completedSearch = s);
    }
    
    private addFriend(newFriendId: number) {
        let newFriend = new Friend();
        newFriend.userProfileId = +this.oidcManagerService.OidcManager.profile.sub;
        newFriend.friendUserProfileId = newFriendId;

        this._friendsCollectionService.createFriend(this.oidcManagerService.OidcManager.profile.sub, newFriend)
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

    public addFriendSave(newFriendsProfileId: number) {
        this.addFriend(newFriendsProfileId);
    }
}
