'use strict';

/**
 * Modulo que contiene la configuracion ajena al entorno de la app.
 *
 * @module
 * @author Guillermo A. Fernández Kessler <guillermo.fernandez@avantrip.com>
 */

const packageJson = require('../package.json');
const env = require('./env');
const utils = require('../common/utils');

module.exports = {

    mongoDB: {
      url: utils.getUrlMongoDB(env.mongoDB.params)
    },
    
    secret: 'devdacticIsAwesome',

    apiInfo: {
      title: 'api-portal API Documentation',
      name: packageJson.name,
      version: packageJson.version,
      description: packageJson.description
    },

    routes: './modules/**/*-routes.js',

    logging: {
      express: true,
      files: true,
      pathDir: 'logs'
    },

    corsConfig: {
      origin: '*',
      methods: [
        'GET',
        'POST',
        'PUT',
        'DELETE',
        'HEAD',
        'OPTIONS'
    ],
      allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Type',
        'Authorization'
    ],
      credentials: true,
      preflightContinue: true
  },

/**
 * Aqui se configuran las dependencias que tiene esta app. Actualmente se
 * puede configurar 3 tipos:
 *
 * externalApi - Para las apis externas a Avantrip. Para estas solo se chequea que responda la url.
 * internalApi - Para las apis propias de Avantrip. Estas responden a traves del keep-alive.
 * mongoDB - Para las apps que usan MongoDB. Se chequea que se pueda conectar a la base.
 *
 */

    healthCheck: {
      dependencies: [
        {
          name: 'radius-api',
          url: 'http://google.com',
          type: 'externalApi'
        },
      /* {
        name: 'internal-api',
        url: 'http://vuelos.fake.com/v1/keep-alive',
        type: 'internalApi'
      },*/
        {
          name: 'mongoDB-api-portal',
          url: utils.getUrlMongoDB(env.mongoDB.params),
          type: 'mongoDB'
        }
    ],
    timeout: 10000
  }
};

