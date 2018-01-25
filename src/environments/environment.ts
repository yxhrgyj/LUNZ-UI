// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  appName: 'LUNZ+',
  production: false,
  version: '2.0',
  localeId: 'zh-CN',
  defaultLanguage: 'zh-CN',
  supportedLanguages: [
    'en-US',
    'fr-FR'
  ],
  // Web Api
  // serverUrl: '//localhost:38544/api/',
  serverUrl: '',
  appKey: '',
  withHeaders: true,
  // User Centertech
  userCenter: {
    serverUrl: '',
    appKey: '',
    authUri: ''
  },
  // Message Center
  msgCenter: {
    signalR: '',
    serverUrl: '',
    appKey: ''
  }
};
