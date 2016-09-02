'use strict';

var mongoose = require('mongoose');
var passport    = require('passport');
var common = require('../../config/common'); 
var User = require('../../modules/models/user');
// pass passport for configuration

require('../../config/passport')(passport);
const logger = require('../../middlewares/logger');
const errorMessages = require('../../middlewares/error/error-messages');

/**
 * User Controller.
 *
 * @module
 * @author gmartinez <gisela.martinez@avantrip.com>
 */

 
var db = mongoose.connect(common.mongoDB.url);

/**
 * Get User.
 *
 * @param req
 * @param res
 */
function getUser(req, res) {

    const idParam = req.params.id;

    logger.info('Obteniendo user con id: %s', idParam);

    const product = {
        id: idParam,
        name: 'Producto 1'
    };

    res.jsonp(product);
}

/**
 * Save User.
 *
 * @param req
 * @param res
 */
function saveUser(req, res) {

    logger.info('Creando producto');

    res.jsonp(req.body);
}

/**
 * Update User.
 *
 * @param req
 * @param res
 */
function updateUser(req, res) {

    const idParam = req.params.id;

    logger.info('Actualizando producto con id: %s', idParam);

    res.jsonp(req.body);
}

/**
 * Delete User.
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function deleteUser(req, res, next) {

    logger.error('Funcionalidad no implementada');

    return next(errorMessages.NOT_IMPLEMENTED);
}

function signup(req, res) {
  if (!req.body.name || !req.body.password) {
    res.json({
        success: false, 
        msg: 'Please pass name and password.'
    });
  } else {
    
    var newUser = new User({
      name: req.body.name,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
}


module.exports = {
    getUser,
    saveUser,
    updateUser,
    deleteUser,
    signup
};
