import {Component, OnInit} from 'angular2/core';
import {NgForm} from 'angular2/common';

import {OidcManagerService} from '../oidc-manager.service';
import {UserProfileService} from './user-profile.service';

import {UserProfile} from './user-profile';

@Component({
    selector: 'user-profile-form',
    templateUrl: 'user-profile-form.component.html',

    providers: [UserProfileService]
})

export class UserProfileFormComponent implements OnInit {
    constructor(public oidcManagerService: OidcManagerService, private _userProfileService: UserProfileService) { }

    public userProfile: UserProfile;

    public errorMessage: string = '';

    public submitted: boolean = false;

    private getUserProfile() {
        this._userProfileService.getUserProfile(this.oidcManagerService.OidcManager.profile.sub)
            .subscribe(
            user => this.userProfile = user,
            error => this.errorMessage = <any>error
        );
    }

    private updateUserProfile() {
        this._userProfileService.updateUserProfile(this.oidcManagerService.OidcManager.profile.sub, this.userProfile).subscribe();
    }

    public profileSave() {
        this.submitted = true;

        this.updateUserProfile();
    }

    public ngOnInit() {
        this.submitted = false;
        this.getUserProfile();
    }
}
