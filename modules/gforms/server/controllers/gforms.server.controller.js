'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  GForm = mongoose.model('GForm'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  nodemailer = require('nodemailer'),
  smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(
    smtpTransport('smtps://essieforms%40gmail.com:formspassword@smtp.gmail.com')
);

/**
 * Create an gform
 */
exports.create = function (req, res) {
  var gform = new GForm(req.body);
  gform.user = req.user;

  gform.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      transporter.sendMail({
        from: 'EssieForms@email.com',
        to: gform.user.email,
        subject: 'Succesful New Form',
        text: 'Congrats ' + gform.user.firstName + '! You have succesfully submited ' + gform.title + '.'
      });

      res.json(gform);
    }
  });
};

/**
 * Show the current gform
 */
exports.read = function (req, res) {
  res.json(req.gform);
};

/**
 * Update an gform
 */
exports.update = function (req, res) {
  var gform = req.gform;

  gform.title = req.body.title;
  gform.content = req.body.content;

  gform.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(gform);
    }
  });
};

/**
 * Delete an gform
 */
exports.delete = function (req, res) {
  var gform = req.gform;

  gform.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(gform);
    }
  });
};

/**
 * List of GForms
 */
exports.list = function (req, res) {
  GForm.find().sort('-created').populate('user', 'displayName').exec(function (err, gforms) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(gforms);
    }
  });
};

/**
 * GForm middleware
 */
exports.gformByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'GForm is invalid'
    });
  }

  GForm.findById(id).populate('user', 'displayName').exec(function (err, gform) {
    if (err) {
      return next(err);
    } else if (!gform) {
      return res.status(404).send({
        message: 'No gform with that identifier has been found'
      });
    }
    req.gform = gform;
    next();
  });
};
