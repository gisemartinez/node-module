'use strict';

/**
 * Modulo del tratamiento de errores.
 *
 * @module
 * @author Guillermo A. Fernández Kessler <guillermo.fernandez@avantrip.com>
 */

const logger = require('../logger');
const stackErrors = require('./error-messages');

/**
 * Logging de los errores.
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
function logErrors(err, req, res, next) {

	let rawError = err;

	if (err.stack) {
		rawError = err.stack;
	}
	logger.error('Original error', rawError);

	next(err);
}

/**
 * Obtiene el error que corresponda, si no existe setea uno por defecto.
 *
 * @param err
 * @returns {stackErrors.BOOM|{message, statusCode}}
 */
function getError(err) {

	let error = stackErrors.BOOM;

	if (err && err.statusCode) {
		error = err;
	}

	return error;
}

/**
 * Captura los errores lanzados desde los controllers.
 *
 * @param err
 * @param req
 * @param res
 * @param next
 */
function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars

	const error = getError(err);

	logger.error('Response error', error);
	res.status(error.statusCode);
	res.jsonp(error);
}


module.exports.logErrors = logErrors;
module.exports.errorHandler = errorHandler;

