'use strict';

/**
 * Modulo que contiene la configuracion de Express.
 *
 * @module
 * @author Guillermo A. Fernández Kessler <guillermo.fernandez@avantrip.com>
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const morganLogger = require('morgan');
const compress = require('compression');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const config = require('./config');
const logger = require('../middlewares/logger');
const utils = require('../common/utils');
const errorHandler = require('../middlewares/error/error-handler');
const swaggerConfig = require('./../middlewares/swagger');
const mongoose = require('mongoose');
const passport = require('passport');
const jwt = require('jwt-simple');

/**
 * Crea una Express app
 *
 * @returns {*}
 */
function createExpressApp() {

  const app = express();

  app.use(cors(config.corsConfig));

  // compress all requests
  app.use(compress());

  // Request body parsing middleware should be above methodOverride
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  // Use helmet to secure Express headers
  app.use(helmet());

  // Use the passport package in our application
  app.use(passport.initialize());

  // Logging express request
  if (config.logging.express) {
    app.use(morganLogger('combined', { stream: logger.stream }));
  }

  // Swagger json doc
  app.get('/api-portal-api/documentation', (req, res) => {
    res.jsonp(swaggerConfig);
  });

  // Health services
  app.use('/api-portal-api', require('../middlewares/health/health-routes'));

  // Require routing
  const routes = utils.getModulesPaths(config.routes);

  routes.forEach((routePath) => {
    const route = require(path.resolve(routePath));
    app.use('/api-portal-api', route);
  });
  app.set('port', config.server.port);

    // Error Handler
  app.use(errorHandler.logErrors);
  app.use(errorHandler.errorHandler);

  return app;
}

module.exports = createExpressApp();

