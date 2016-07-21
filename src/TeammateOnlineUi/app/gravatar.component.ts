import {Component, OnInit, Input} from 'angular2/core';

declare var SparkMD5: any;

@Component({
    selector: 'gravatar',
    templateUrl: 'gravatar.html'
})

export class GravatarComponent implements OnInit {
    @Input() size: number = 200;
    @Input() email: string = "";

    public url: string = "";

    constructor() { }

    public ngOnInit() {
        let hashedEmail = SparkMD5.hash(this.email);

        this.url = "https://www.gravatar.com/avatar/" + hashedEmail + "?s=" + this.size + "&d=mm";
    }
}
