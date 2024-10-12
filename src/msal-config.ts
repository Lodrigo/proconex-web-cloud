import { Configuration } from "@azure/msal-browser";
import { environment } from "./environments/environment";

export const msalConfig: Configuration = {
    auth: {
        clientId: '409b9706-f654-48ae-b6e7-b7f670176638',
        authority: 'https://login.microsoftonline.com/7fe14ab6-8f5d-4139-84bf-cd8aed0ee6b9/oauth2/v2.0/authorize',
        redirectUri: `${environment.msalConfig.auth.redirectUri}`
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false
    }
};
