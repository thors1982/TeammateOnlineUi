import {Component, OnInit} from 'angular2/core';

import {GravatarComponent} from '../gravatar.component';

import {OidcManagerService} from '../oidc-manager.service';
import {FriendsCollectionService} from './friends-collection.service';

import {Friend} from './friend';

@Component({
    templateUrl: 'friends-collection.html',

    providers: [FriendsCollectionService],

    directives: [GravatarComponent]
})

export class FriendsCollectionComponent implements OnInit {
    constructor(
        public oidcManagerService: OidcManagerService,
        private _friendsCollectionService: FriendsCollectionService) {
    }

    public friends: Friend[];

    public errorMessage: string = '';

    public selectedFriend: Friend;    

    private getFriends() {
        this._friendsCollectionService.getFriends(this.oidcManagerService.OidcManager.profile.sub)
            .subscribe(
            friends => this.friends = friends,
            error => this.errorMessage = <any>error
            );
    }

    public ngOnInit() {
        this.getFriends();
    }
}
