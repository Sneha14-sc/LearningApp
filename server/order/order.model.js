'use strict';

/**
 * Module dependencies
 */
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Schema = mongoose.Schema;

/**
 * Define constant value
 */

const STATUS = {
    RESERVED:0,
    DONE:1,
    CANCELED:2,
    WAIT:3
};

const PAYMENT_METHOD = {
    CASH: 0,
    CREDIT: 1
};

const SEAT_TYPE = {
    TABLE:0,
    COUNTER:1,
    OUT:-1
};

const EAT_PLACE = {
    TAKE_OUT:0,
    EAT_IN:1,
    UNKNOWN:2,
};

const ORDER_NUMBER_DIGIT = 5;

/**
 * Define product Schema
 */
const orderSchema = new Schema({
    //order Information
    _id:{type:String,required:true,unique:true}, //use for delivery
    combinedOrderId:{type:String,required:true},
    orderNumber:{type:Number,required:true},
    status: {type: Number, default: STATUS.RESERVED},
    createdBy:{type:String, require:true},
    createdTime:{type:Date, default:Date.now},

    // Product information
    listProduct:[{
        status: {type: Number, default: STATUS.RESERVED},
        productName:{type: String, default: ''},
        price:{type:Number, default:0},
        quantity:{type:Number, default:0},
        kitchenStation:{type:String},
        startTime:{type:Date, default:Date.now},
        endTime:{type:Date, default:Date.now}
    }],

    //position information
    seatNumber:{type:String,default:'0'},
    seatType:{type:Number, default:SEAT_TYPE.OUT },

    eatPlace:{type:Number, default:EAT_PLACE.UNKNOWN},

    isDeleted:{type: Boolean}
});

/**
 * Virtual
 */
orderSchema.virtual('totalPrice').get(function(){
    let totalPrice = 0;

    this.listProduct.forEach(function(product) {
        if(product.status != STATUS.CANCELED) {
            totalPrice += (product.price * product.quantity);
        }
    });

    return totalPrice;
});

// orderSchema.virtual('isDone').get(function () {
//     let isDone = 0;
//     let countProductStatusCancelDone = 0;
//
//     this.listProduct.forEach(function(product) {
//         if( (product.status === STATUS.DONE) ||
//             (product.status === STATUS.CANCELED)
//         ){
//             countProductStatusCancelDone += 1;
//         }
//     });
//
//     if(countProductStatusCancelDone === this.listProduct.length) {
//         isDone = 1;
//     }
//
//     return isDone;
// });

/**
 * Validations
 */

/**
 * Index
 */
orderSchema.index({createdTime:1,combinedOrderId:1});

orderSchema.set('toObject', { virtuals: true });
orderSchema.set('toJSON', { virtuals: true });
/**
 * create the model and expose it to our app
 */
module.exports = mongoose.model('Order', orderSchema);
module.exports.ORDER_NUMBER_DIGIT = ORDER_NUMBER_DIGIT;
module.exports.STATUS = STATUS;
