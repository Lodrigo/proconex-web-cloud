export const environment = {
    production: false,
    apiUrl: 'https://localhost:44300/',
    msalConfig: {
        auth: {
            clientId: '409b9706-f654-48ae-b6e7-b7f670176638',
            authority: 'https://login.microsoftonline.com/7fe14ab6-8f5d-4139-84bf-cd8aed0ee6b9',
            redirectUri: 'http://localhost:4200',
            postLogoutRedirectUri: 'http://localhost:4200'
        }
    },
    apiConfig: {
        scopes: ['api://409b9706-f654-48ae-b6e7-b7f670176638/openid'],
    }
};