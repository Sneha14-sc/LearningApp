'use strict';

const mongoose = require('mongoose');

var collectionSchema = mongoose.Schema(
    {
        categoryName:{type: String, unique: true, required:true},
        items:[{
            type: mongoose.SchemaTypes.ObjectId, ref: 'product'
        }],
        picture:{type:String},
        modifiedData:{type:Date, default:Date.now},
        isAvailable:{type:Boolean, default:true},

    }, { strict:true, timeStamp: true }
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


collectionSchema.set('toObject', { virtuals: true });
collectionSchema.set('toJSON', { virtuals: true });
// create the model for blog and expose it to our app
module.exports = mongoose.model('collectionVer2',collectionSchema);
