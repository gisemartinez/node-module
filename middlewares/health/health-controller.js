'use strict';

/**
 * Health Controller. Chequea el status de las dependencias y funcionamiento de la app.
 *
 * @module
 * @author Guillermo A. Fernández Kessler <guillermo.fernandez@avantrip.com>
 */

const _ = require('lodash');
const config = require('../../config/config');
const checker = require('./health-checker');
const logger = require('../logger');

/**
 * Servicio de chequeo de la app.
 *
 * @param req
 * @param res
 */
function getStatus(req, res) {
	res.sendStatus(200);
}

/**
 * Chequea que las despendencias de la app esten operativas.
 *
 * @param req
 * @param res
 */
function getStatusDependencies(req, res) {

	logger.info('Chequeando status de las dependencias...');

	const checkList = config.healthCheck.dependencies;
	const promises = [];
	const result = {};

	result.version = config.apiInfo.version;
	result.name = config.apiInfo.name;

	checkList.forEach((dependency) => {
		promises.push(checker[dependency.type](dependency));
	});

	Promise.all(promises).then((values) => {

		const aux = {};

		values.map(val => {
			return _.extend(aux, val);
		});

		result.dependencies = aux;

		logger.info('Status dependencias:', result);

		res.jsonp(result);
	});

}

module.exports = {
	getStatus,
	getStatusDependencies
};
