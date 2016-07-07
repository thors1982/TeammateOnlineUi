import {Component, OnInit} from 'angular2/core';

import {SearchUserProfilesByEmailFormComponent} from './search-user-profiles-by-email-form.component';

@Component({
    templateUrl: 'search-user-profiles.html',

    directives: [SearchUserProfilesByEmailFormComponent]
})

export class SearchUserProfilesComponent implements OnInit {

    constructor() { }

    public ngOnInit() {
    }
}
