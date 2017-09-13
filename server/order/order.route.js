'use strict';

/**
 * Module dependencies
 */
const express = require('express');
const status = require('http-status');
const Order = require('./order.model');
const combinedOrder = require('./../combinedOrder/combinedOrder.model');
const _ = require('underscore');
const authenConfig = require('../config/auth');

//utilities
const authenMiddlewares = require('./../utilities/authen.middlewares');
const emailUtil = require('./../utilities/emailAPI');

const logger = require('../utilities/logger');
const path = require('path');
const apiParamMng = require('../utilities/api.param.manager');

const router = express.Router();

/**
* Define constant value
*/
const MAX_LIMIT = 10000;

const RANDOM_LENGTH = 1;
//not use character (O) and number 0 because they are similar to each other
//not use l because it is similar to 1
const RANDOM_CHARACTER = "abcdefghijkmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ0123456789";

//params to check query params
const acceptableQueryParams = [
    ['_id'],
    ['combinedOrderId'],
    ['status'],
    ['createdBy'],
    ['startCreatedTime','endCreatedTime'],
];

//body params for edit
const acceptableEditParams = [
    ['isDeleted'],
];

//params to make find object
const acceptableFindFields = [
    //find Object field name    //query params
    ['_id',                     '_id'],
    ['combinedOrderId',         'combinedOrderId'],
    ['status',                  'status'],
    ['createdBy',               'createdBy'],
    ['createdTime',             'startCreatedTime','endCreatedTime'],
];

/***************************************************************************
 * private function
 ***************************************************************************/

/**
 * make select object for get api
 * @param queryParams
 * @returns {{}}
 */
function makeSelectObject(queryParams) {
    logger.debugFuncCall(path.basename(__filename), makeSelectObject.name);

    return {};
}

/** Default : sort by order time
 * make sort Object
 * @param queryParams
 */
function makeSortObject(queryParams){
    logger.debugFuncCall(path.basename(__filename), makeSortObject.name);

    let sortObject = {};

    if(queryParams.hasOwnProperty('sortBy') && queryParams.hasOwnProperty('sortWay')){
        if( (queryParams.sortWay === 1) || (queryParams.sortWay === -1) ) {
            sortObject[queryParams.sortBy] = queryParams.sortWay;
        } else {
            sortObject = {
                createdTime: 1
            }
        }
    } else {
        sortObject = {
            createdTime: 1
        }
    }

    return sortObject;
}

/**
 * get Limit value to find database
 * @param queryParams
 */
function getLimitValueToGet(queryParams) {
    logger.debugFuncCall(path.basename(__filename), getLimitValueToGet.name);

    let limitValue = MAX_LIMIT;

    if(queryParams.hasOwnProperty('ordersByPage')){
        if( (0 < queryParams.ordersByPage ) && (queryParams.ordersByPage < MAX_LIMIT) )
        limitValue = queryParams.ordersByPage
    }

    return parseInt(limitValue);
}

/**
 * get skip value to find database
 * @param queryParams
 */
function getSkipValueToGet(queryParams){
    logger.debugFuncCall(path.basename(__filename), getSkipValueToGet.name);

    let skipValue = 0;

    let limitValue = getLimitValueToGet(queryParams);

    if(limitValue < MAX_LIMIT) {
        if(queryParams.hasOwnProperty('pageNo')){
            skipValue = limitValue * ( parseInt(queryParams.pageNo) -1);
        }
    }

    return parseInt(skipValue);
}

/**
 * generate order id = tableNumber(2digit)-RANDOM(1 chu/so)-convert_timestamp
 *
 */
function generateOrderId(convertedOrderedTime,seatNumberStr) {
    logger.debugFuncCall(path.basename(__filename), generateOrderId.name);

    let i;
    let encodeTimeString = '';
    let orderedTimeSplit = convertedOrderedTime.split(':');

    for(i = 0; i < orderedTimeSplit.length; i++) {
        encodeTimeString += RANDOM_CHARACTER[parseInt(orderedTimeSplit[i])];
    }

    let randomCharacter = '';
    for(i =0; i<RANDOM_LENGTH; i++) {
        randomCharacter += RANDOM_CHARACTER[Math.floor(Math.random() * RANDOM_CHARACTER.length)];
    }

    //set orderId
    let orderId = seatNumberStr + '-' + randomCharacter + '-' + encodeTimeString;

    logger.debugStdOut(path.basename(__filename), 'orderID: '+ orderId);

    return orderId;
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

    Order.count({}, function (err, count) {
        if (err) {
            res.status(status.INTERNAL_SERVER_ERROR).json({"error": "something is wrong"});
        } else {
            res.status(status.OK).json({count: count});
        }
    });
});

/**
 * Get order
 */
router.get('/', function (req, res, next) {
    logger.debugStdOut(path.basename(__filename), 'getAPI(req.query) ' + JSON.stringify(req.query));

    if(apiParamMng.checkGetQueryParams(req.query, acceptableQueryParams)) {
        let findObject = apiParamMng.makeFindObject(req.query,acceptableFindFields);
        let selectObject = makeSelectObject(req.query);
        let sortObject = makeSortObject(req.query);
        let limitValue = parseInt(getLimitValueToGet(req.query));
        let skipValue = parseInt(getSkipValueToGet(req.query));

        logger.debugStdOut(path.basename(__filename), 'findObject ' + JSON.stringify(findObject));
        logger.debugStdOut(path.basename(__filename), 'selectObject ' + JSON.stringify(selectObject));
        logger.debugStdOut(path.basename(__filename), 'sortObject ' + JSON.stringify(sortObject));
        logger.debugStdOut(path.basename(__filename), 'limitValue ' + limitValue);
        logger.debugStdOut(path.basename(__filename), 'skipValue ' + skipValue);

        Order.find(findObject)
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
 * Edit overwrite full info
 */

router.post('/:orderID/edit', function(req, res, next){
    logger.debugStdOut(path.basename(__filename), 'orderID ' + req.params.orderID);
    logger.debugStdOut(path.basename(__filename), 'req.body ' +  JSON.stringify(req.body));

    logger.stream.write("IP:" + req.connection.remoteAddress + ", edit order id: " + req.params.orderID.toString() + ", edit request:" +JSON.stringify(req.body));

    if(apiParamMng.checkGetQueryParams(req.body, acceptableEditParams)) {
        let findObject = {};
        findObject._id = req.params.orderID;
        Order.findOneAndUpdate(findObject, {$set: req.body})
            .exec(function (err,foundItem) {
                if (err) {
                    res.status(status.INTERNAL_SERVER_ERROR).json({"error": "something is wrong"});
                } else {
                    //broadcast event
                    res.sendStatus(status.OK);
                }
            });
    } else {
        res.status(status.BAD_REQUEST).json({"error": "Bad Request"});
    }
});

/**
 * update only product Status
 */
router.post('/:orderID/updateProduct', function(req, res, next){
    logger.debugStdOut(path.basename(__filename), 'updateProduct ' + req.params.orderID);
    logger.debugStdOut(path.basename(__filename), 'req.body ' +  JSON.stringify(req.body));

    logger.stream.write("IP:" + req.connection.remoteAddress + ",updateProduct: " + req.params.orderID.toString() + ", edit request:" +JSON.stringify(req.body));

    if( (req.body.hasOwnProperty('productName')) &&
        (req.body.hasOwnProperty('status'))
    ) {
        let findObject = {};
        findObject._id = req.params.orderID;
        findObject["listProduct.productName"] = req.body.productName;

        let updateObject = {};
        updateObject["listProduct.$.status"] = req.body.status;

        Order.findOneAndUpdate(findObject, {$set: updateObject},
            function (err, foundItem) {
                if (err) {
                    res.status(status.INTERNAL_SERVER_ERROR).json({"error": "something is wrong"});
                    return;
                } else {

                    if(foundItem == null) {
                        res.sendStatus(status.NOT_FOUND);
                        return;
                    }
                    var notDoneOrderObject = foundItem.listProduct.filter(function(p){
                        return (p.status == Order.STATUS.RESERVED || p.status == Order.STATUS.WAIT );
                    });

                    if(notDoneOrderObject.length == 1) {
                        if( (notDoneOrderObject[0].productName == req.body.productName) &&
                            ( (req.body.status == Order.STATUS.DONE) || (req.body.status == Order.STATUS.CANCELED) )
                        )
                        {
                            //TODO: trigger print here
                            console.log("print here");

                            //update order status
                            Order.update({_id: req.params.orderID}, {$set: {status:1}}, function (err, doc) {
                                if (err) {
                                    console.log(err);
                                    res.status(status.INTERNAL_SERVER_ERROR).json({"error": "something is wrong"});
                                } else {
                                    res.sendStatus(status.OK);
                                }
                            });
                        } else {
                            res.sendStatus(status.OK);
                        }
                    } else {
                        res.sendStatus(status.OK);
                    }

                }
            });
    } else {
        res.status(status.BAD_REQUEST).json({"error": "Bad Request"});
    }
});

//Router function End
module.exports = router;
