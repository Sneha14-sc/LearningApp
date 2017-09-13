'use strict';

const mongoose = require('mongoose');

var templateSchema = mongoose.Schema(
    {

    }, { strict:true }
);

/**
 * Virtual
 */


/**
 * Validations
 */

/**
 * Index
 */


templateSchema.set('toObject', { virtuals: true });
templateSchema.set('toJSON', { virtuals: true });
// create the model for blog and expose it to our app
module.exports = mongoose.model('template',templateSchema);