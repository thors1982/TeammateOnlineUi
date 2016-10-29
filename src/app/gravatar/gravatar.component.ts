import { Component, OnInit, Input } from '@angular/core';

import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'gravatar',
  templateUrl: 'gravatar.html'
})

export class GravatarComponent implements OnInit {
  @Input() size: number = 200;
  @Input() email: string = "";
  @Input() tag: string = "";

  public url: string = "";
  public imageTag: string = "";

  constructor() { }

  public ngOnInit() {
    let hashedEmail = Md5.hashStr(this.email);

    this.url = "https://www.gravatar.com/avatar/" + hashedEmail + "?s=" + this.size + "&d=mm";
    this.imageTag = this.tag;
  }
}
