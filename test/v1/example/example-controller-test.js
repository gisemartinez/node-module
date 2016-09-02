'use strict';

/**
 * Example Test.
 *
 * @module
 * @author gmartinez <gisela.martinez@avantrip.com>
 */

const should = require('should');
const request = require('supertest');
const app = require('../../../config/express');


describe('Example Controller Test :: Get Product', () => {

  																																								it('Should get a Product', (done) => {

    																																								request(app)
      .get('/api-portal-api/v1/products/1')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        																																								should.not.exist(err);
        																																								should.equal(res.body.id, 1);
        																																								done();
      });
  });

});

describe('Example Controller Test :: Post Product', () => {

  																																								it('Should post a Product', (done) => {

    																																								request(app)
      .post('/api-portal-api/v1/products')
      .send({
        																																								id: 2,
        																																								name: 'Product'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        																																								should.not.exist(err);
        																																								should.equal(res.body.id, 2);
        																																								done();
      });
  });

});

describe('Example Controller Test :: Put Product', () => {

  																																								it('Should put a Product', (done) => {

    																																								request(app)
      .put('/api-portal-api/v1/products/4')
      .send({
        																																								id: 4,
        																																								name: 'Other Product'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        																																								should.not.exist(err);
        																																								should.equal(res.body.id, 4);
        																																								done();
      });
  });

});

describe('Example Controller Test :: Delete Product', () => {

  																																								it('Should get Error when delete Product', (done) => {

    																																								request(app)
      .delete('/api-portal-api/v1/products/4')
      .expect('Content-Type', /json/)
      .expect(501)
      .end((err, res) => {
        																																								should.not.exist(err);
        																																								should.equal(res.body.message, 'Funcionalidad no implementada');
        																																								done();
      });
  });

});
