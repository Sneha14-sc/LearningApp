'use strict';

/**
 * Module dependencies
 */
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird'); //avoid warning when starts server
const status = require('http-status');
const Order = require('./../order/order.model');

const _ = require('underscore');
const async = require('async');

const combinedOrder = require('./combinedOrder.model');

/**
 * utilities
 */

//authentication
const authenMiddlewares = require('./../utilities/authen.middlewares');

//api params
const apiParamMng = require('../utilities/api.param.manager');

//logger
const logger = require('../utilities/logger');
const path = require('path');

const router = express.Router();

/**
 * Define constant value
 */
const GET_API_LIMIT_VALUE_DEFAULT = 10000;
const GET_API_SET_LIMIT_PARAM_NAME = "limit";
const GET_API_PAGE_NO_PARAM_NAME = "pageNo";

const RANDOM_LENGTH = 1;
//not use character (O) and number 0 because they are similar to each other
//not use l because it is similar to 1
const RANDOM_CHARACTER = "abcdefghijkmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ0123456789";

const getAPI__defaultSortObject = {
    createdTime:-1
};

//get Api
const getAPI__acceptableGetQueryParams = [
    /*
    Ex:
     ['_id'],
     ['pageNo','ordersByPage'],
     ['startOrderTime','endOrderTime'],
     */
    ['_id'],
    ['status'],
    ['startCreatedTime','endCreatedTime']
];

const getAPI__acceptableFindFields = [
    /*
     Ex:
     ['_id',                     '_id'],
     ['status',                  'status'],
     ['customer.name',           'customer.name'],
     ['orderTime',               'startOrderTime','endOrderTime'],
     */
    ['_id',                     '_id'],
    ['status',                  'status'],
    ['createdTime',             'startCreatedTime','endCreatedTime'],
];

//statistic api
const getAPI__acceptableStatisticQueryParams = [
    ['startCreatedTime','endCreatedTime']
];

const editAPI__acceptableEditParams = [
    /*
    Ex:
     ['status.vn'],
     ['status.jp'],
     ['comment']
     */
    ['isDeleted'],
];

/***************************************************************************
 * private function
 ***************************************************************************/

/**
 * make select object for get api
 * @param queryParams
 * @returns {{}}
 */
function getAPI__selectObject(queryParams) {
    logger.debugFuncCall(path.basename(__filename), getAPI__selectObject.name);

    return {};
}

/**
 * make sort Object
 * @param queryParams
 */
function getAPI__sortObject(queryParams){
    logger.debugFuncCall(path.basename(__filename), getAPI__sortObject.name);

    let sortObject = {};

    if(queryParams.hasOwnProperty('sortBy') && queryParams.hasOwnProperty('sortWay')){
        if( (queryParams.sortWay === 1) || (queryParams.sortWay === -1) ) {
            sortObject[queryParams.sortBy] = queryParams.sortWay;
            return sortObject;
        }
    }

    return getAPI__defaultSortObject;
}

/**
 * get Limit items to responce one time
 * @param queryParams
 */
function getAPI__limitItemsOnce(queryParams) {
    logger.debugFuncCall(path.basename(__filename), getAPI__limitItemsOnce.name);

    let limitValue;

    if(queryParams.hasOwnProperty(GET_API_SET_LIMIT_PARAM_NAME)){
        limitValue = queryParams[GET_API_SET_LIMIT_PARAM_NAME];
    } else {
        limitValue = GET_API_LIMIT_VALUE_DEFAULT;
    }

    return parseInt(limitValue);
}


/**
 * get skip value to find database
 * @param queryParams
 */
function getAPI__skipValue(queryParams){
    logger.debugFuncCall(path.basename(__filename), getAPI__skipValue.name);

    let skipValue = 0;

    let limitValue = getAPI__limitItemsOnce(queryParams);

    if(queryParams.hasOwnProperty(GET_API_PAGE_NO_PARAM_NAME)){
        if(parseInt(queryParams[GET_API_PAGE_NO_PARAM_NAME]) >= 1) {
            skipValue = limitValue * ( parseInt(queryParams[GET_API_PAGE_NO_PARAM_NAME]) - 1);
        }
    }

    return parseInt(skipValue);
}

/**
 *
 * @param requestBody
 * @returns {string}
 */
function generateCombinedOrderId(requestBody){
    logger.debugFuncCall(path.basename(__filename), generateCombinedOrderId.name);

    let combinedOrderId = '';
    let i;

    //set Table Number
    let seatNumber = -1; // when takeout seatNumber = -1

    if(requestBody.hasOwnProperty('seatNumber')) {
        seatNumber = requestBody.seatNumber;
    }

    let seatNumberString = ('00' + seatNumber).slice(-2);

    //set Random character
    let randomCharacter = '';
    for(i =0; i<RANDOM_LENGTH; i++) {
        randomCharacter += RANDOM_CHARACTER[Math.floor(Math.random() * RANDOM_CHARACTER.length)];
    }

    //set timeStamp
    let now = new Date();
    let timeStamp =
        (now.getMonth() + 1).toString() + ':'
        + now.getDate().toString() + ':'
        + now.getHours().toString() + ':'
        + now.getMinutes().toString() + ':'
        + now.getSeconds().toString();

    combinedOrderId = seatNumberString + '-' + randomCharacter + '-' + timeStamp;

    return combinedOrderId;
}

/*********************************************************************
 * API
 ********************************************************************/
/**
 * get total number of Items
 */
router.get('/countTotal', function (req, res, next) {
    logger.debugStdOut(path.basename(__filename), 'getAPI(countTotal) ' );

    combinedOrder.count({}, function (err, count) {
        if (err) {
            res.status(status.INTERNAL_SERVER_ERROR).json({"error": "something is wrong"});
        } else {
            res.status(status.OK).json({count: count});
        }
    });

});

/**
 * get api
 */
router.get('/', function (req, res, next) {
    logger.debugStdOut(path.basename(__filename), 'getAPI(req.query) ' + JSON.stringify(req.query));

    if(apiParamMng.checkGetQueryParams(req.query, getAPI__acceptableGetQueryParams)) {

        let findObject = apiParamMng.makeFindObject(req.query,getAPI__acceptableFindFields);
        let selectObject = getAPI__selectObject(req.query);
        let sortObject = getAPI__sortObject(req.query);
        let limitValue = getAPI__limitItemsOnce(req.query);
        let skipValue = getAPI__skipValue(req.query);

        logger.debugStdOut(path.basename(__filename), 'findObject ' + JSON.stringify(findObject));
        logger.debugStdOut(path.basename(__filename), 'selectObject ' + JSON.stringify(selectObject));
        logger.debugStdOut(path.basename(__filename), 'sortObject ' + JSON.stringify(sortObject));
        logger.debugStdOut(path.basename(__filename), 'limitValue ' + limitValue);
        logger.debugStdOut(path.basename(__filename), 'skipValue ' + skipValue);

        combinedOrder.find(findObject)
            .select(selectObject)
            .limit(limitValue)
            .skip(skipValue)
            .sort(sortObject)
            .exec(function (err, foundItems) {
                if (err) {
                    res.status(status.INTERNAL_SERVER_ERROR).json({"error": "something is wrong"});
                } else {
                    logger.debugStdOut(path.basename(__filename), 'foundItems ' + foundItems);
                    res.status(status.OK).json(foundItems);
                }
            });

    } else {
        res.status(status.BAD_REQUEST).json({"error": "Bad Request"});
    }
});

/**
 * get api
 */
router.get('/revenueStatistic/', function (req, res, next) {
    logger.debugStdOut(path.basename(__filename), 'revenueStatistic(req.query) ' + JSON.stringify(req.query));

    let matchStatus = 1;

    if(req.query.hasOwnProperty('status')) {
        matchStatus = parseInt(req.query.status);
    }

    if(req.query.hasOwnProperty('startCreatedTime') && req.query.hasOwnProperty('endCreatedTime')) {

        combinedOrder.aggregate([
            //matching phase
            //Mongoose will only return with $match if the date is wrapped in ISODate()
            {
                $match:{
                    createdTime:{
                        $gte:new Date(req.query.startCreatedTime),
                        $lt:new Date(req.query.endCreatedTime)
                    },
                    status: matchStatus
                }
            },

            //unwind listProduct Array
            {
                $unwind : "$listProduct"
            },

            //group phase
            {
                $group:{
                    _id:'$listProduct.productName', //group phase must have _id field
                    quantity:{$sum:"$listProduct.quantity"},
                    revenue:{$sum: { $multiply: [ '$listProduct.quantity', '$listProduct.price' ]} }
                }
            }
        ],function (err, result) {
            if(err) {
                res.status(status.INTERNAL_SERVER_ERROR).json({"error": "something is wrong"});
            } else {
                res.status(status.CREATED).json(result);
            }
        });

    } else {
        res.status(status.BAD_REQUEST).json({"error": "Bad Request"});
    }
});

/**
 * Update api
 * combinedOrderId, status
 * combinedOrderId, poistion.seatNumber
 * combinedOrderId, poistion.seatType
 */
router.post('/:id/edit', function(req, res, next){
    logger.debugStdOut(path.basename(__filename), 'id ' + req.params.id);
    logger.debugStdOut(path.basename(__filename), 'req.body ' +  JSON.stringify(req.body));

    logger.stream.write("IP:" + req.connection.remoteAddress + ", id: " + req.params.id.toString() + ", edit request:" +JSON.stringify(req.body));

    if(apiParamMng.checkGetQueryParams(req.body, editAPI__acceptableEditParams)) {
        combinedOrder.findOneAndUpdate({_id: req.params.id}, {$set: req.body})
            .exec(function (err,foundItem) {
                if (err) {
                    res.status(status.INTERNAL_SERVER_ERROR).json({"error": "something is wrong"});
                } else {
                    res.sendStatus(status.OK);
                }
            });
    } else {
        res.status(status.BAD_REQUEST).json({"error": "Bad Request"});
    }
});


//Router function End
module.exports = router;
