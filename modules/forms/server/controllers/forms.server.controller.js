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
    smtpTransport('') //insert email in here that will be used as transporter to send emails. See nodemailer documentation for format.
  );

/**
 * Create an form
 */
exports.create = function (req, res, next) {
  console.log(req.body);
  var form;
  var ft;

  // selects the type of object to create based on the type of form
  // each object has a different schema to follow based on the forms' fields
  // TODO: combine all form types into a general object that can handle all types of forms dynamically
  if(req.body.form.formType === 'phd-committee'){
    form = new PhDCommitteeForm(req.body.form);
    ft = 'Ph.D. Program Supervisory Committee';
  }
  else {
    console.log('invalid form type');
    return res.status(400).send({
      message: 'invalid form type'
    });
  }

  form.user = req.user;

  form.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      //Sends an email when a form is successfully saved to the database
      //SEE nodemailer documentation to learn how to setup and use a transporter to send emails
      transporter.sendMail({
        from: 'EssieForms@email.com',
        to: req.body.form.email,
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

// TODO: implement approve or deny implementationa and update the status of the form
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
	/*TO-DO: currently this will only find PHDforms. Some form of conditional,
	(if/else) should be implemented to determine which type of form it is and
	list that form.*/
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

  PhDCommitteeForm.findById(id).populate('user', 'displayName').exec(function (err, form) {
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
