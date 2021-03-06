'use strict';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'jsonapi-fiddle',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
    EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },
  
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      externalLibraries: [
        'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'
      ],
      apidocs: '/apidocs/index.html'
    },

    resizeServiceDefaults: {
      injectionFactories: ['controller']
    }
  };

  if (environment === 'development') {
    ENV.APP.externalLibraries.push('/assets/jsonapi.js');
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
    ENV.rootURL = '/jsonapi-fiddle';
    ENV.APP.apidocs = '/jsonapi-fiddle/apidocs/index.html'
    ENV.APP.externalLibraries.push('/jsonapi-fiddle/assets/jsonapi.js');
    ENV.locationType = 'hash';
  }

  return ENV;
};
