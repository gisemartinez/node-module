'use strict';

/**
 * Modulo que chequea el status de las dependencias de la app.
 *
 * @module
 * @author Guillermo A. Fernández Kessler <guillermo.fernandez@avantrip.com>
 */

const request = require('request');
const healthCheckMongodb = require('health-check-mongodb');
const logger = require('../logger');
const config = require('../../config/config');

const OK = 'ok';
const FAIL = 'fail';
const INTERNAL_API = 'internalApi';
const EXTERNAL_API = 'externalApi';


function isOK(response) {
	return response && response.statusCode && response.statusCode === 200;
}

/**
 * Chequea que MongoDB este operativo.
 *
 * @param dependency
 * @returns {Promise}
 */
function checkMongoDBStatus(dependency) {

	const result = {};

	return new Promise((resolve) => {

		healthCheckMongodb.do([{ url: dependency.url }])
			.then(response => {

				if (response.health === true) {
					result[dependency.name] = OK;
					resolve(result);
				} else {
					result[dependency.name] = FAIL;
					resolve(result);
				}
			})
			.catch(error => {

				logger.error('Ocurrio un error al verificar conexión a MongoDB', error);
				result[dependency.name] = FAIL;
				resolve(result);

			});

	});
}

/**
 * Cheque del status de la APIs.
 *
 * @param dependency
 * @returns {Promise}
 */
function checkApiStatus(dependency) {

	const result = {};

	return new Promise(resolve => {

		request.get(dependency.url, { timeout: config.healthCheck.timeout })
			.on('response', response => {

				if (dependency.type === EXTERNAL_API) {
					result[dependency.name] = OK;
				} else if (dependency.type === INTERNAL_API && isOK(response)) {
					result[dependency.name] = OK;
				} else {
					result[dependency.name] = FAIL;
				}

				resolve(result);
			})
			.on('error', err => {

				logger.error('Ocurrio un error al verificar la api: %s', dependency.name, err);
				result[dependency.name] = FAIL;
				resolve(result);
			});
	});
}

/**
 * Verifica que las apis internas esten operativas a traves del
 * servicio keep-alive
 *
 * @param dependency
 * @returns {Promise}
 */
function checkInternalApiStatus(dependency) {
	return checkApiStatus(dependency);
}

/**
 * Verifica que las apis externas esten disponibles chequeando
 * que la url responda sin tener en cuenta el status code.
 *
 * @param dependency
 * @returns {Promise}
 */
function checkExternalApiStatus(dependency) {  // TODO: quizas se pueda mejorar
	return checkApiStatus(dependency);
}


module.exports = {
	mongoDB: checkMongoDBStatus,
	internalApi: checkInternalApiStatus,
	externalApi: checkExternalApiStatus
};
