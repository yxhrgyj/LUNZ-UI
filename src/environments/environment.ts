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
  serverUrl: '//lunz-sharp.lunztech.cn/api/',
  appKey: 'a9ee8aaa-9c5b-4f56-9cb0-3a840b6e27f9',
  withHeaders: true,
  // User Centertech
  userCenter: {
    serverUrl: '//usercenter2015.lunztech.cn/api/',
    appKey: '4f500000-4c4f-0200-903a-08d4ccde1e74',
    authUri: '//usercenter2015.lunztech.cn/'
  },
  // Message Center
  msgCenter: {
    signalR: '//messagecenter.lunztech.cn/',
    serverUrl: '//messagecenter.lunztech.cn/api/',
    appKey: '53cdc9ab-4c9f-420b-b727-fe0602a7387c'
  }
};
