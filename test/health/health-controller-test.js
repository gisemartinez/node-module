'use strict';

/**
 * Health Test.
 *
 * @module
 * @author Guillermo A. Fernández Kessler <guillermo.fernandez@avantrip.com>
 */

const should = require('should');
const request = require('supertest');
const nock = require('nock');
const app = require('../../config/express');
const config = require('../../config/config');


describe('Health Controller Test :: Keep Alive', () => {

  																																								it('Should get OK', (done) => {
    																																								request(app)
      .get('/api-portal-api/keep-alive')
      .expect(200)
      .end((err, res) => {
        																																								should.not.exist(err);
        																																								should.exist(res.body);
        																																								done();
      });
  });

});

describe('Health Controller Test :: Health Check', function () {

  																																								afterEach((done) => {
    																																								nock.cleanAll();
    																																								done();
  });

  																																								this.timeout(15000);


  																																								it('Should get status ok externalApi', (done) => {

    																																								config.healthCheck.dependencies = [
      																																								{
        																																																																																name: 'Test',
        																																																																																url: 'http://fakeapi.com/v1/keep-alive',
        																																																																																type: 'externalApi'
      																																								}
    ];

    																																								nock('http://fakeapi.com')
      .get('/v1/keep-alive')
      .reply(200);

    																																								request(app)
      .get('/api-portal-api/health-check')
      .expect(200)
      .end((err, res) => {
        																																								should.not.exist(err);
        																																								should.equal(res.body.dependencies.Test, 'ok');
        																																								done();
      });
  });

  																																								it('Should get status fail internalApi', (done) => {

    																																								config.healthCheck.dependencies = [
      																																								{
        																																																																																name: 'Test',
        																																																																																url: 'http://fakeapi.com/v1/keep-alive',
        																																																																																type: 'internalApi'
      																																								}
    ];

    																																								nock('http://fakeapi.com')
      .get('/v1/keep-alive')
      .reply(400);

    																																								request(app)
      .get('/api-portal-api/health-check')
      .expect(200)
      .end((err, res) => {
        																																								should.not.exist(err);
        																																								should.equal(res.body.dependencies.Test, 'fail');
        																																								done();
      });
  });

  																																								it('Should get status ok internalApi', (done) => {

    																																								config.healthCheck.dependencies = [
      																																								{
        																																																																																name: 'Test',
        																																																																																url: 'http://fakeapi.com/v1/keep-alive',
        																																																																																type: 'internalApi'
      																																								}
    ];

    																																								nock('http://fakeapi.com')
      .get('/v1/keep-alive')
      .reply(200);

    																																								request(app)
      .get('/api-portal-api/health-check')
      .expect(200)
      .end((err, res) => {
        																																								should.not.exist(err);
        																																								should.equal(res.body.dependencies.Test, 'ok');
        																																								done();
      });
  });

  																																								it('Should get fail status MongoDB', (done) => {

    																																								config.healthCheck.dependencies = [
      																																								{
        																																																																																name: 'MongoDB',
        																																																																																url: 'mongodb://fakeUrl:27017/fakeDB',
        																																																																																type: 'mongoDB'
      																																								}
    ];

    																																								request(app)
      .get('/api-portal-api/health-check')
      .expect(200)
      .end((err, res) => {
        																																								should.not.exist(err);
        																																								should.equal(res.body.dependencies.MongoDB, 'fail');
        																																								done();
      });
  });

  																																								it('Should get status fail timeout api', (done) => {

    																																								config.healthCheck.dependencies = [
      																																								{
        																																																																																name: 'Test',
        																																																																																url: 'http://fakeapi.com/v1/keep-alive',
        																																																																																type: 'internalApi'
      																																								}
    ];

    																																								nock('http://fakeapi.com')
      .get('/v1/keep-alive')
      .delayConnection(10000)
      .reply(200);

    																																								request(app)
      .get('/api-portal-api/health-check')
      .expect(200)
      .end((err, res) => {
        																																								should.not.exist(err);
        																																								should.equal(res.body.dependencies.Test, 'fail');
        																																								done();
      });
  });

  																																								it('Should get status fail error api', (done) => {

    																																								config.healthCheck.dependencies = [
      																																								{
        																																																																																name: 'Test',
        																																																																																url: 'http://fakeapi.com/v1/keep-alive',
        																																																																																type: 'internalApi'
      																																								}
    ];

    																																								nock('http://fakeapi.com')
      .get('/v1/keep-alive')
      .replyWithError('something awful happened');

    																																								request(app)
      .get('/api-portal-api/health-check')
      .expect(200)
      .end((err, res) => {
        																																								should.not.exist(err);
        																																								should.equal(res.body.dependencies.Test, 'fail');
        																																								done();
      });
  });

});
