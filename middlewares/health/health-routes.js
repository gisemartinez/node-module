'use strict';

/**
 * Router de los servicios de health check.
 *
 * @module
 * @author Guillermo A. Fernández Kessler <guillermo.fernandez@avantrip.com>
 */

const express = require('express');
const router = express.Router();
const healthController = require('./health-controller');

/**
 * @swagger
 * /keep-alive:
 *   get:
 *     tags:
 *       - Health
 *     summary: Chequea que la api se este ejecutando
 *     description: Chequea que la api se este ejecutando
 *     responses:
 *       204:
 *         description: OK
 */
router.get('/keep-alive', healthController.getStatus);

/**
 * @swagger
 * /health-check:
 *   get:
 *     tags:
 *       - Health
 *     summary: Chequea las dependencias
 *     description: Chequea el status de las dependencias de la api.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Status de las dependencias
 */
router.get('/health-check', healthController.getStatusDependencies);

module.exports = router;

