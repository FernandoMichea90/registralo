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
    FIREBASE_API_KEY: 'AIzaSyBZGZ8eYr6ru1_7V1zp5vcPTp0pw4-WVTk',
    FIREBASE_AUTH_DOMAIN: 'registros-911f1.firebaseapp.com',
    FIREBASE_PROJECT_ID: 'registros-911f1',
    FIREBASE_STORAGE_BUCKET: 'registros-911f1.appspot.com',
    FIREBASE_MESSAGING_SENDER_ID: '883808704738',
    FIREBASE_APPID: '1:883808704738:web:da5e5e542888bee464e6bb',
    FIREBASE_MEASUREMENT_ID: 'G-9N0G8QDG4W',
    // AWS COGNITO
    AWS_COGNITO_USER_POOL_ID: '',
    AWS_COGNITO_CLIENT_ID: '',
    // AUTH0
    AUTH0_DOMAIN: '',
    AUTH0_CLIENT_ID: '',
  },
});
