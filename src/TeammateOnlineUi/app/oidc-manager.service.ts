import {Injectable} from 'angular2/core';

declare var OidcTokenManager: any;

@Injectable()
export class OidcManagerService {
    public OidcManager: any;

    constructor() {
        let config = {
            client_id: "TeammateOnlineUi",
            redirect_uri: "http://localhost:59505/oauth-callback",
            response_type: "id_token token",
            scope: "openid profile email",
            authority: "http://localhost:31482/",
            post_logout_redirect_uri: "http://localhost:59505/",
            silent_redirect_uri: "http://localhost:59505/silentrefreshframe.html",
            silent_rewnew: true
        };
        this.OidcManager = new OidcTokenManager(config);
    }

    public checkForOauthCallback() {
        if (window.location.hash) {
            let config = {
                client_id: "TeammateOnlineUi",
                redirect_uri: "http://localhost:59505/oauth-callback",
                response_type: "id_token token",
                load_user_profule: false,
                authority: "http://localhost:31482/",
                post_logout_redirect_uri: "http://localhost:59505/",
                silent_redirect_uri: "http://localhost:59505/silentrefreshframe.html",
                silent_rewnew: true
            };
            let tempOidc = new OidcTokenManager(config);
            tempOidc.processTokenCallbackAsync().then(
                function () {
                    window.location.href = "http://localhost:59505";
                },
                function (error: any) {
                    alert("Problem getting token: " + (error.message || error));
                }
            );
        }
    }

    public logout() {
        this.OidcManager.redirectForLogout();
    }

    public loginWithGoogle() {
        this.OidcManager._settings.acr_values = "idp:Google";
        this.OidcManager.redirectForToken();
    }

    public loginWithFacebook() {
        this.OidcManager._settings.acr_values = "idp:Facebook";
        this.OidcManager.redirectForToken();
    }
}
