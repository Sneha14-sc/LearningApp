'use strict';

const mongoose = require('mongoose');

const SEAT_TYPE = {
    TABLE:0,
    COUNTER:1
};

var seatSchema = mongoose.Schema(
    {
        number:{Type:Number},
        type:{Type:String, default:SEAT_TYPE.TABLE},
        tableNumber:{Type:Number, default:0}

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


seatSchema.set('toObject', { virtuals: true });
seatSchema.set('toJSON', { virtuals: true });
// create the model for blog and expose it to our app
module.exports = mongoose.model('seat',seatSchema);
