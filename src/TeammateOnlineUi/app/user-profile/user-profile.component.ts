import { Component, OnInit } from '@angular/core';

import { UserProfileFormComponent } from './user-profile-form.component';

@Component({
    templateUrl: 'user-profile.html',

    directives: [UserProfileFormComponent]
})

export class UserProfileComponent implements OnInit {

    constructor() { }

    public ngOnInit() {
    }
}
