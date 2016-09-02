'use strict';

/**
 * Modulo donde se declaran todos los errores que utilizaremos en la app.
 *
 * @module
 * @author Guillermo A. Fernández Kessler <guillermo.fernandez@avantrip.com>
 */

module.exports = {
	MALFORMED_REQUEST: {
		message: 'El objeto esta mal formado',
		statusCode: 400
	},
	NOT_IMPLEMENTED: {
		message: 'Funcionalidad no implementada',
		statusCode: 501
	},
	BOOM: {
		message: 'Internal Server Error',
		statusCode: 500
	}
};

