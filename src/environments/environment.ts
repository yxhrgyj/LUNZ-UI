// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    version: '(dev)',

    defaultLanguage: 'en-US',
    supportedLanguages: [
        'en-US',
        'fr-FR'
    ],
    // Web Api
    serverUrl: '//datacenter.lunztech.cn/api/',
    appKey: '536BABCC-DD54-42FB-B43E-31C80B7AFA74',
    withHeaders: false,
    // User Center
    userCenter: {
        serverUrl: '//usercenter2015.lunztech.cn/api/',
        appKey: '6861aec5-3774-455d-8d14-0352bdcd21c0'
    }
};
