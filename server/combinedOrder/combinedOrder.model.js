'use strict';

const mongoose = require('mongoose');

/**
 * Define constant value
 */
const STATUS = {
    RESERVED:0,
    DONE:1,
    CANCELED:2,
};

const SEAT_TYPE = {
    TABLE:0,
    COUNTER:1
};

const GENDER = {
    MALE:0,
    FEMALE:1,
    UNKNOWN:2
};

const PAYMENT_METHOD = {
    CASH:0,
    CREDIT:1
};

const DISPLAY_PLACE = {
    KITCHEN:0,
    TAKEOUT_COUNTER:1
};

var combinedOrderSchema = mongoose.Schema(
    {
        //general information
        _id:{type:String,required:true, unique:true}, //use for regi
        status:{type:Number, default:STATUS.RESERVED},

        listProduct:[{
            productName:{type: String, default: ''},
            price:{type:Number, default:0},
            quantity:{type:Number, default:0},
        }],

        //position information
        seatNumber:{type:String,required:true},
        seatType:{type:Number, default:SEAT_TYPE.COUNTER },

        //customer information
        customer:{
            gender:{type:Number, default:GENDER.UNKNOWN},
            pointId:{type:String, default:''},
            paid:{type:Number}
        },

        //timing information
        createdTime:{type:Date, default:Date.now},
        paidTime:{type:Date, default:Date.now},

        //payment Information
        paymentMethod:{type:Number, default:PAYMENT_METHOD.CASH},

        //discount Information
        discount:{
            couponId: {type:String},
            discountPrice:{type:Number}
        },

        //notes Information
        notes:{type:String, default:''},

        isDeleted:{type: Boolean}

    }, { strict:true }
);

/**
 * Virtual
 */
combinedOrderSchema.virtual('totalPrice').get(function(){
    let totalPrice = 0;

    this.listProduct.forEach(function(product) {
        if(product.status != STATUS.CANCELED) {
            totalPrice += (product.price * product.quantity);
        }
    });

    return totalPrice;
});

/**
 * Validations
 */

/**
 * Index
 */

// create the model for blog and expose it to our app
module.exports = mongoose.model('combinedOrder',combinedOrderSchema);
