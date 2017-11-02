'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SubmissionSchema = new Schema({

  name:{
    type: String,
    required: true,
    lowercase: true
  },
  telegramId: {
    type: String,
    lowercase: true
  },
  websiteUrl: String,
  sourceCode: String,
  images: [String],
  CreatedAt: {
    type: Date,
    default: Date.Now
  }
});

module.exports = mongoose.model('Submission', SubmissionSchema);
