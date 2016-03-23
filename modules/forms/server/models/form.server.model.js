'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Form Schema
 */
var PhDCommitteeSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  Term: {
    type: String,
    default: '',
    trim: true,
    required: true
  },
  last_Name: {
    type: String,
    default: '',
    trim: true,
    required: true
  },
  first_Name: {
    type: String,
    default: '',
    trim: true,
    required: true
  },
  m_Initial: {
    type: String,
    default: '',
    trim: true
  },
  uf_id: {
    type: String,
    default: '',
    trim: true,
    required: true
  },
  email: {
    type: String,
    default: '',
    trim: true,
    required: true
  },
  gatorlink: {
    type: String,
    default: '',
    trim: true,
  },
  Chair: {
    type: String,
    default: '',
    trim: true,
    required: true,
    department: {
      type: String,
    }
  },
  co_Chair: {
    type: String,
    default: '',
    trim: true,
    department: {
      type: String,
    }
  },
  member_1: {
    type: String,
    default: '',
    trim: true,
    required: true,
    department: {
      type: String,
    }
  },
  member_2: {
    type: String,
    default: '',
    trim: true,
    required: true,
    department: {
      type: String,
    }
  },
  member_3: {
    type: String,
    default: '',
    trim: true,
    department: {
      type: String,
    }
  },
  external: {
    type: String,
    default: '',
    trim: true,
    required: true,
    department: {
      type: String,
    }
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('PhDCommitteeForm', PhDCommitteeSchema);
