'use strict';

/**
 * Modulo que contiene la configuracion por entorno.
 *
 * @module
 * @author Guillermo A. Fernández Kessler <guillermo.fernandez@avantrip.com>
 */

module.exports = {

	mongoDB: {
		params: {
			user: '',
			password: '',
			host: '127.0.0.1',
			port: '27017',
			database: 'api-portal',
			options: ''
		}
	},

	server: {
		port: process.env.PORT || 3000
	}
};

