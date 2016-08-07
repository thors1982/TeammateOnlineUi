import {Component, OnInit} from 'angular2/core';

import {SearchFormComponent} from './search-form.component';

@Component({
    templateUrl: 'search.html',

    directives: [SearchFormComponent]
})

export class SearchComponent implements OnInit {

    constructor() { }

    public ngOnInit() {
    }
}
