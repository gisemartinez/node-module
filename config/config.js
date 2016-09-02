'use strict';

/**
 * Modulo que unifica las configuraciones de la app.
 *
 * @module
 * @author Guillermo A. Fernández Kessler <guillermo.fernandez@avantrip.com>
 */

const _ = require('lodash');

module.exports = _.extend(
  require('./env'), // eslint-disable-line global-require
  require('./common') // eslint-disable-line global-require
);

