import { Component, OnInit } from '@angular/core';

import { GravatarComponent } from '../gravatar.component';

import { OidcManagerService } from '../oidc-manager.service';
import { UserProfileService } from './user-profile.service';
import { AlertMessageService } from '../alert-message.service';

import { UserProfile } from './user-profile';

@Component({
    selector: 'user-profile-form',
    templateUrl: 'user-profile-form.component.html',

    providers: [UserProfileService],
})

export class UserProfileFormComponent implements OnInit {
    constructor(public oidcManagerService: OidcManagerService, private _userProfileService: UserProfileService, private alertMessageService: AlertMessageService) { }

    public userProfile: UserProfile;
    
    public submitted: boolean = false;

    private getUserProfile() {
        this._userProfileService.getUserProfile(this.oidcManagerService.OidcManager.profile.sub)
            .subscribe(
            user => this.userProfile = user,
            error => this.alertMessageService.addMessage('error', <any>error)
            );
    }

    private updateUserProfile() {
        this._userProfileService.updateUserProfile(this.oidcManagerService.OidcManager.profile.sub, this.userProfile)
            .subscribe(
            success => console.log('success'),
            error => {
                this.alertMessageService.addMessage('error', <any>error);
                this.submitted = false;
                }
            );
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
