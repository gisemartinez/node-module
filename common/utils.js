'use strict';

/**
 * Modulo con funcionalidades genericas.
 *
 * @module
 * @author Guillermo A. Fernández Kessler <guillermo.fernandez@avantrip.com>
 */

const glob = require('glob');
const moment = require('moment-timezone');

const BUENOS_AIRES_TIME_ZONE = 'America/Argentina/Buenos_Aires';

/**
 * Obtiene la fecha y hora de Buenos Aires en el formato correspondiente.
 *
 * @param format
 * @returns {*}
 */
function getBAMoment(format) {
	return moment().tz(BUENOS_AIRES_TIME_ZONE).format(format);
}

/**
 * Genera la url para la conexion de MongoDB.
 *
 * @param params
 * @returns {string}
 */
function getUrlMongoDB(params) {

	let url = 'mongodb://';

	if (params.user && params.password) {
		url += `${params.user}:${params.password}@`;
	}

	url += `${params.host}:${params.port}/${params.database}`;

	if (params.options) {
		url += `?${params.options}`;
	}

	return url;
}

/**
 * Obtiene sincronicamente los archivos a traves de un patron.
 *
 * @param pattern
 * @returns {*}
 */
function getModulesPaths(pattern) {
	return glob.sync(pattern);
}


module.exports = {
	getUrlMongoDB,
	getBAMoment,
	getModulesPaths
};
