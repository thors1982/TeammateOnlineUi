import {Component, OnInit} from 'angular2/core';

import {GravatarComponent} from '../gravatar.component';

import {OidcManagerService} from '../oidc-manager.service';
import {FriendsCollectionService} from './friends-collection.service';
import {FriendRequestsCollectionService} from './friend-requests-collection.service';

import {Friend} from './friend';
import {FriendRequest} from './friend-request';

@Component({
    templateUrl: 'friends-collection.html',

    providers: [FriendsCollectionService, FriendRequestsCollectionService],

    directives: [GravatarComponent]
})

export class FriendsCollectionComponent implements OnInit {
    constructor(
        public oidcManagerService: OidcManagerService,
        private _friendsCollectionService: FriendsCollectionService, private _friendRequestsCollectionService: FriendRequestsCollectionService) {
    }

    public friends: Friend[];

    public friendRequests: FriendRequest[];

    public errorMessage: string = '';

    public selectedFriend: Friend;    

    private getFriends() {
        this._friendsCollectionService.getFriends(this.oidcManagerService.OidcManager.profile.sub)
            .subscribe(
            friends => this.friends = friends,
            error => this.errorMessage = <any>error
            );
    }

    private getFriendRequests() {
        this._friendRequestsCollectionService.getFriendRequests(this.oidcManagerService.OidcManager.profile.sub)
            .subscribe(
            friendRequests => this.friendRequests = friendRequests,
            error => this.errorMessage = <any>error
            );
    }

    private acceptFriendRequest(acceptFriendRequest: FriendRequest) {
        acceptFriendRequest.isAccepted = true;
        acceptFriendRequest.isPending = false;

        this._friendRequestsCollectionService.updateFriendRequest(this.oidcManagerService.OidcManager.profile.sub, acceptFriendRequest)
            .subscribe(
            data => { },
            error => this.errorMessage = <any>error,
            () => this.updateCollections()
            );
    }

    private declineFriendRequest(declineFriendRequest: FriendRequest) {
        this._friendRequestsCollectionService.deleteFriendRequest(this.oidcManagerService.OidcManager.profile.sub, declineFriendRequest.id)
            .subscribe(
            data => { },
            error => this.errorMessage = <any>error,
            () => this.updateCollections()
            );
    }

    private updateCollections() {
        this.getFriends();
        this.getFriendRequests();
    }

    public ngOnInit() {
        this.updateCollections();
    }

    public acceptFriendRequestSave(request: FriendRequest) {
        this.acceptFriendRequest(request);    
    }

    public declineFriendRequestSave(request: FriendRequest) {
        this.declineFriendRequest(request);
    }
}
