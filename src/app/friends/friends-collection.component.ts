import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OidcManagerService } from '../oidc-manager.service';
import { FriendService } from './friend.service';
import { FriendRequestService } from './friend-request.service';
import { AlertMessageService } from '../alert-message.service';

import { Friend } from './friend';
import { FriendRequest } from './friend-request';

@Component({
  templateUrl: 'friends-collection.html',

  providers: [FriendService, FriendRequestService]
})

export class FriendsCollectionComponent implements OnInit {
  constructor(
    public oidcManagerService: OidcManagerService,
    public router: Router,
    private _friendService: FriendService,
    private _friendRequestService: FriendRequestService,
    private alertMessageService: AlertMessageService) {
  }

  public friends: Friend[];

  public friendRequests: FriendRequest[];

  public errorMessage: string = '';

  public selectedFriend: Friend;

  private getFriends() {
    this._friendService.getFriends(this.oidcManagerService.OidcManager.profile.sub)
      .subscribe(
        friends => this.friends = friends,
        error => this.alertMessageService.addMessage('error', <any>error)
      );
  }

  private getFriendRequests() {
    this._friendRequestService.getFriendRequests(this.oidcManagerService.OidcManager.profile.sub)
      .subscribe(
        friendRequests => this.friendRequests = friendRequests,
        error => this.alertMessageService.addMessage('error', <any>error)
      );
  }

  private acceptFriendRequest(acceptFriendRequest: FriendRequest) {
    acceptFriendRequest.isAccepted = true;
    acceptFriendRequest.isPending = false;

    this._friendRequestService.updateFriendRequest(this.oidcManagerService.OidcManager.profile.sub, acceptFriendRequest)
      .subscribe(
        data => { },
        error => this.alertMessageService.addMessage('error', <any>error),
        () => this.updateCollections()
      );
  }

  private declineFriendRequest(declineFriendRequest: FriendRequest) {
    this._friendRequestService.deleteFriendRequest(this.oidcManagerService.OidcManager.profile.sub, declineFriendRequest.id)
      .subscribe(
        data => { },
        error => this.alertMessageService.addMessage('error', <any>error),
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

  public viewFriendDetail(friendId: number) {
    this.router.navigate(['/friendsgames', friendId.toString() ]);
  }

  public acceptFriendRequestSave(request: FriendRequest) {
    this.acceptFriendRequest(request);
  }

  public declineFriendRequestSave(request: FriendRequest) {
    this.declineFriendRequest(request);
  }
}
