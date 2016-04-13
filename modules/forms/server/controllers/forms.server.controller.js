'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  PhDCommitteeForm = mongoose.model('PhDCommitteeForm'),
  Approver = mongoose.model('Approver'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  nodemailer = require('nodemailer'),
  smtpTransport = require('nodemailer-smtp-transport'),
  transporter = nodemailer.createTransport(
    smtpTransport('smtps://essieforms%40gmail.com:formspassword@smtp.gmail.com')
  );

/**
 * Create an form
 */
exports.create = function (req, res, next) {
  console.log(req.body);
  var form;
  var ft;

  if(req.body.form.formType === 'phd-committee'){
    form = new PhDCommitteeForm(req.body.form);
    ft = 'Ph.D. Program Supervisory Committee';
  }
  else {
    console.log('invalid form type');
    return res.status(400).send({
      message: "invalid form type"
    });
  }

  form.user = req.user;

  form.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      transporter.sendMail({
        from: 'EssieForms@email.com',
        to: 'essiestudent1@gmail.com',
        subject: 'Succesful Form Submission',
        text: 'Congrats ' + req.body.form.first_Name + '! You have succesfully submitted the ' + ft + ' form.'
      });

      res.json(form);
    }
  });
};

/**
 * Show the current form
 */
exports.read = function (req, res) {
  res.json(req.form);
};

/**
 * Update an form
 */
// exports.update = function (req, res) {
//   var form = req.form;

//   form.title = req.body.title;
//   form.content = req.body.content;

//   form.save(function (err) {
//     if (err) {
//       return res.status(400).send({
//         message: errorHandler.getErrorMessage(err)
//       });
//     } else {
//       res.json(form);
//     }
//   });
// };

/**
 * Delete an form
 */
exports.delete = function (req, res) {
  var form = req.form;

  form.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(form);
    }
  });
};

//lists all the approvers in the db
exports.listApprover = function (req, res) {
  Approver.find().sort('name').exec(function (err, approvers) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(approvers);
    }
  });
};

/**
 * List of PhDCommitteeForms
 */
exports.list = function (req, res) {
  PhDCommitteeForm.find().sort('-created').exec(function (err, forms) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(forms);
    }
  });
};

/**
 * PhDCommitteeForm middleware
 */
exports.formByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'PhDCommitteeForm is invalid'
    });
  }

  PhDCommitteeForm.findById(id).populate('user', 'full_Name').exec(function (err, form) {
    if (err) {
      return next(err);
    } else if (!form) {
      return res.status(404).send({
        message: 'No form with that identifier has been found'
      });
    }
    req.form = form;
    next();
  });
};

