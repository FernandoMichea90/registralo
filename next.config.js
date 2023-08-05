const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/list',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  '@fullcalendar/timeline',
]);

module.exports = {
 
  
}

module.exports = withTM({
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  swcMinify: false,
  trailingSlash: true,
  env: {
    // HOST
    HOST_API_KEY: 'https://api-dev-minimal-v4.vercel.app',
    // MAPBOX
    MAPBOX_API: '',
   // FIREBASE
   FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
   FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
   FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
   FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
   FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
   FIREBASE_APPID: process.env.FIREBASE_APPID,
   FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    // AWS COGNITO
    AWS_COGNITO_USER_POOL_ID: '',
    AWS_COGNITO_CLIENT_ID: '',
    // AUTH0
    AUTH0_DOMAIN: '',
    AUTH0_CLIENT_ID: '',
  },
});
