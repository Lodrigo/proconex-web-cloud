export const environment = {
    production: false,
    apiUrl: 'http://localhost:5171/api',
    msalConfig: {
        auth: {
            clientId: '409b9706-f654-48ae-b6e7-b7f670176638',
            authority: 'https://login.microsoftonline.com/7fe14ab6-8f5d-4139-84bf-cd8aed0ee6b9',
            redirectUri: 'https://da-renewals.synnex.org/',
            postLogoutRedirectUri: 'https://da-renewals.synnex.org/'
        }
    },
    apiConfig: {
        scopes: ['api://409b9706-f654-48ae-b6e7-b7f670176638/openid'],
    }
};