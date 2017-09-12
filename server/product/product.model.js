'use strict';

const mongoose = require('mongoose');

/**
 * This product schema is studied from shopify
 */
var productSchema = mongoose.Schema(
    {

        productName: {type: String, required:true},
        isAvailable:{type:Boolean, default:true},
        price:{type:Number, default:0},
        kitchenStation:{type: String, default:''}

        /* below informations will be used to extend system
        // Store information
        storeID: {type: String},

        // Description
        description:{type: String, default: ''},

        // Images
        pictures: [{ type: String,default:''}],
        thumbnail: { type: String,default:''},

        // Options
        options: [
            { optionName: [
                {optionValue: {type: String }}
                ]
            }
        ],

        // Tax
        chargeTaxesOn: {type: Boolean, default: true}, // giá đã bao gồm thuế hay chưa

        // Inventory
        isTrackInventory: {type: Boolean},

        // Shipping
        isRequiredShipping: {type: Boolean, default: false},

        // Variant
        variants: [{
            option: {type: String},
            price: {type: Number},
            compareAtPrice: {type: Number, default: 0}, // giá bán so sánh thường cao hơn price
            SKU: {type: String},
            barCode: {type: String},
            inventoryQuantity: {type: Number},
            isHide: {type: Boolean, default: false}
        }],

        // search Engine
        SEO: {
            pageTitle: {type: String},
            metaDescription: {type: String},
            url: {type: String}
        },

        // organization
        productTypes:[{type: String}],
        collections:[{type: String}],
        tags:[{type: String}],

        processingStation:{type:String},
        isDeleted:{type:Boolean, default:false},

        relatedProducts:[{
            productID:{type: String},
            score:{type:Number}
        }]
        */

    },
    { strict:true, timeStamp: true }
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


productSchema.set('toObject', { virtuals: true });
productSchema.set('toJSON', { virtuals: true });
// create the model for blog and expose it to our app
module.exports = mongoose.model('product',productSchema);
