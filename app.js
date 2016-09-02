'use strict';

/**
 * Inicia la app.
 *
 * @module
 * @author G
 */

const app = require('./config/express');
const logger = require('./middlewares/logger');

const server = app.listen(app.get('port'), () => {
	logger.info('Express server listening on port %s', server.address().port);
});
