import {Component, OnInit} from 'angular2/core';
import {NgForm} from 'angular2/common';
import {RouteParams, RouteData} from 'angular2/router';

import {OidcManagerService} from './oidc-manager.service';
import {UserProfilesCollectionService} from './user-profiles-collection.service';
import {FriendsCollectionService} from './friends/friends-collection.service';

import {Friend} from './friends/friend';
import {UserProfile} from './user-profile/user-profile';

@Component({
    selector: 'search-user-profiles-by-email-form',
    templateUrl: 'search-user-profiles-by-email-form.component.html',

    providers: [UserProfilesCollectionService, FriendsCollectionService]
})

export class SearchUserProfilesByEmailFormComponent implements OnInit {
    constructor(params: RouteParams, data: RouteData, public oidcManagerService: OidcManagerService, private _userProfilesCollectionService: UserProfilesCollectionService, private _friendsCollectionService: FriendsCollectionService) {
        this.emailAddress = params.get('searchText');
        if (this.emailAddress != null) {
            this.findByEmailAddress();
        }
    }

    public foundUserProfiles: UserProfile[];

    public errorMessage: string = '';

    public emailAddress: string = '';

    private findByEmailAddress() {
        this._userProfilesCollectionService.findByEmailAddress(this.emailAddress).subscribe((up: UserProfile[]) => this.foundUserProfiles = up);
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
    }

    public searchByEmailSave() {
        this.findByEmailAddress();
    }

    public addFriendSave(newFriendsProfile: UserProfile) {
        this.addFriend(newFriendsProfile.id);
    }
}
