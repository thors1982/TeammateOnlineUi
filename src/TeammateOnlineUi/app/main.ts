/// <reference path="../node_modules/angular2/typings/browser.d.ts" />

import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {AppComponent} from './app.component';
import 'rxjs/Rx';

import {OidcManagerService} from './oidc-manager.service';


bootstrap(AppComponent, [HTTP_PROVIDERS, OidcManagerService]);
