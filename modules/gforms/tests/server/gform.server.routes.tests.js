'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  GForm = mongoose.model('GForm'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, gform;

/**
 * GForm routes tests
 */
describe('GForm CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new gform
    user.save(function () {
      gform = {
        title: 'GForm Title',
        content: 'GForm Content'
      };

      done();
    });
  });

  it('should be able to save an gform if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new gform
        agent.post('/api/gforms')
          .send(gform)
          .expect(200)
          .end(function (gformSaveErr, gformSaveRes) {
            // Handle gform save error
            if (gformSaveErr) {
              return done(gformSaveErr);
            }

            // Get a list of gforms
            agent.get('/api/gforms')
              .end(function (gformsGetErr, gformsGetRes) {
                // Handle gform save error
                if (gformsGetErr) {
                  return done(gformsGetErr);
                }

                // Get gforms list
                var gforms = gformsGetRes.body;

                // Set assertions
                (gforms[0].user._id).should.equal(userId);
                (gforms[0].title).should.match('GForm Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an gform if not logged in', function (done) {
    agent.post('/api/gforms')
      .send(gform)
      .expect(403)
      .end(function (gformSaveErr, gformSaveRes) {
        // Call the assertion callback
        done(gformSaveErr);
      });
  });

  it('should not be able to save an gform if no title is provided', function (done) {
    // Invalidate title field
    gform.title = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new gform
        agent.post('/api/gforms')
          .send(gform)
          .expect(400)
          .end(function (gformSaveErr, gformSaveRes) {
            // Set message assertion
            (gformSaveRes.body.message).should.match('Title cannot be blank');

            // Handle gform save error
            done(gformSaveErr);
          });
      });
  });

  it('should be able to update an gform if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new gform
        agent.post('/api/gforms')
          .send(gform)
          .expect(200)
          .end(function (gformSaveErr, gformSaveRes) {
            // Handle gform save error
            if (gformSaveErr) {
              return done(gformSaveErr);
            }

            // Update gform title
            gform.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing gform
            agent.put('/api/gforms/' + gformSaveRes.body._id)
              .send(gform)
              .expect(200)
              .end(function (gformUpdateErr, gformUpdateRes) {
                // Handle gform update error
                if (gformUpdateErr) {
                  return done(gformUpdateErr);
                }

                // Set assertions
                (gformUpdateRes.body._id).should.equal(gformSaveRes.body._id);
                (gformUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of gforms if not signed in', function (done) {
    // Create new gform model instance
    var gformObj = new GForm(gform);

    // Save the gform
    gformObj.save(function () {
      // Request gforms
      request(app).get('/api/gforms')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single gform if not signed in', function (done) {
    // Create new gform model instance
    var gformObj = new GForm(gform);

    // Save the gform
    gformObj.save(function () {
      request(app).get('/api/gforms/' + gformObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('title', gform.title);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single gform with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/gforms/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'GForm is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single gform which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent gform
    request(app).get('/api/gforms/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No gform with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an gform if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new gform
        agent.post('/api/gforms')
          .send(gform)
          .expect(200)
          .end(function (gformSaveErr, gformSaveRes) {
            // Handle gform save error
            if (gformSaveErr) {
              return done(gformSaveErr);
            }

            // Delete an existing gform
            agent.delete('/api/gforms/' + gformSaveRes.body._id)
              .send(gform)
              .expect(200)
              .end(function (gformDeleteErr, gformDeleteRes) {
                // Handle gform error error
                if (gformDeleteErr) {
                  return done(gformDeleteErr);
                }

                // Set assertions
                (gformDeleteRes.body._id).should.equal(gformSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an gform if not signed in', function (done) {
    // Set gform user
    gform.user = user;

    // Create new gform model instance
    var gformObj = new GForm(gform);

    // Save the gform
    gformObj.save(function () {
      // Try deleting gform
      request(app).delete('/api/gforms/' + gformObj._id)
        .expect(403)
        .end(function (gformDeleteErr, gformDeleteRes) {
          // Set message assertion
          (gformDeleteRes.body.message).should.match('User is not authorized');

          // Handle gform error error
          done(gformDeleteErr);
        });

    });
  });

  it('should be able to get a single gform that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new gform
          agent.post('/api/gforms')
            .send(gform)
            .expect(200)
            .end(function (gformSaveErr, gformSaveRes) {
              // Handle gform save error
              if (gformSaveErr) {
                return done(gformSaveErr);
              }

              // Set assertions on new gform
              (gformSaveRes.body.title).should.equal(gform.title);
              should.exist(gformSaveRes.body.user);
              should.equal(gformSaveRes.body.user._id, orphanId);

              // force the gform to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the gform
                    agent.get('/api/gforms/' + gformSaveRes.body._id)
                      .expect(200)
                      .end(function (gformInfoErr, gformInfoRes) {
                        // Handle gform error
                        if (gformInfoErr) {
                          return done(gformInfoErr);
                        }

                        // Set assertions
                        (gformInfoRes.body._id).should.equal(gformSaveRes.body._id);
                        (gformInfoRes.body.title).should.equal(gform.title);
                        should.equal(gformInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      GForm.remove().exec(done);
    });
  });
});
