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
  // full_Name: {
  //   type: String,
  //   default: '',
  //   trim: true,
  //   required: true
  // },
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
  // gatorlink: {
  //   type: String,
  //   default: '',
  //   trim: true,
  // },
  Chair: {
    name: {
      type: String,
      default: '',
      trim: true,
      required: true
    },
    department: {
      type: String
    }
  },
  co_Chair: {
    name: {
      type: String,
      default: '',
      trim: true,
      required: true
    },
    department: {
      type: String
    }
  },
  member_1: {
    name: {
      type: String,
      default: '',
      trim: true,
      required: true
    },
    department: {
      type: String
    }
  },
  member_2: {
    name: {
      type: String,
      default: '',
      trim: true,
      required: true
    },
    department: {
      type: String
    }
  },
  member_3: {
    name: {
      type: String,
      default: '',
      trim: true,
      required: true
    },
    department: {
      type: String
    }
  },
  external: {
    name: {
      type: String,
      default: '',
      trim: true
     // required: true,
    },
    department: {
      type: String
    }
  },
  formType:{
    type: String,
    required: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
});

/*when exporting this model it will go by the name of the first argument.
the third paramater is used to redirect all models of schemas to a specific 
collection within mongolab, in this case, forms*/
mongoose.model('PhDCommitteeForm', PhDCommitteeSchema, 'forms');
