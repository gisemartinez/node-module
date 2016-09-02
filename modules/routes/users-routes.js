'use strict';

/**
 * Users Router.
 *
 * @module
 * @author gmartinez <gisela.martinez@avantrip.com>
 */

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users-controller');


/**
 * @swagger
 * definition:
 *   User:
 *     type: object
 *     required:
 *      - id
 *      - username
 *      - password
 *     properties:
 *       id:
 *         type: integer
 *         format: int64
 *         description : id
 *       username:
 *         type: string
 *         description : username
 *       password:
 *         type: string
 *         description : pass
 */


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - API users
 *     summary: Obtiene user
 *     description: Obtiene user a partir de un id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de user
 *         required: true
 *         type: integer
 *         format: int64
 *     responses:
 *       200:
 *         description: Retorna un user
 *         schema:
 *           $ref: '#/definitions/Product'
 */
router.get('/users/:id', usersController.getUser);

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - API users
 *     summary: Crea un user
 *     description: Crea un user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: row
 *         description: Un user
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: user creado
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.post('/users', usersController.saveUser);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - API users
 *     summary: Actualiza producto
 *     description: Actualiza producto a partir de un id
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de producto
 *         required: true
 *         type: integer
 *         format: int64
 *       - name: body
 *         in: body
 *         description: User a actualizar
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: Retorna un producto
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.put('/users/:id', usersController.updateUser);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - API users
 *     summary: Borra producto
 *     description: Borra producto a partir de un id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID de producto
 *         required: true
 *         type: integer
 *         format: int64
 *     responses:
 *       204:
 *         description: User borrado
 */
router.delete('/users/:id', usersController.deleteUser);

router.post('/signup', usersController.signup);

module.exports = router;
