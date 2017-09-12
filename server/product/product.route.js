'use strict';

/**
 * Module dependencies
 */
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird'); //avoid warning when starts server
const status = require('http-status');

const _ = require('underscore');

const product = require('./product.model');


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
const GET_API_LIMIT_VALUE_DEFAULT = 100;
const GET_API_SET_LIMIT_PARAM_NAME = "limit";
const GET_API_PAGE_NO_PARAM_NAME = "pageNo";

//TODO: set default sortObject for get api
const getAPI__defaultSortObject = {};

//TODO: set acceptable query params for get api
const getAPI__acceptableGetQueryParams = [
    /*
    Ex:
     ['_id'],
     ['pageNo','ordersByPage'],
     ['startOrderTime','endOrderTime'],
     */
    ['_id'],
    ['name'],
    ['price'],
    ['quantity']
    ['kitchenStation'],
    ['isAvailable'],
    ['hide'],
    ['tags'],
    ['createdAt'],
    ['updatedAt']
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
    ['name',                    'name'],
    ['price',                   'price'],
    ['quantity',                'quantity'],
    ['kitchenStation',          'kitchenStation'],
    ['isAvailable',             'isAvailable'],
    ['hide',                    'hide'],
    ['tags',                    'tags'],
    ['createdAt',               'startCreatedAt','endCreatedAt'],
    ['updatedAt',               'startUpdatedAt','endUpdatedAt'],
];


//TODO: set acceptable params for edit api
const editAPI__acceptableEditParams = [
    /*
    Ex:
     ['status.vn'],
     ['status.jp'],
     ['comment']
     */
    ['name'],
    ['shortDescription'],
    ['description'],
    ['pictures'],
    ['thumbnail'],
    ['price'],
    ['quantity']
    ['kitchenStation'],
    ['tags']
    ['isAvailable'],
    ['hide'],
];

//TODO: need to set security for apis
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
 * make post info
 * @param requestBody
 * @returns {{}}
 */
function postAPI__createItemInfo(requestBody) {
    logger.debugFuncCall(path.basename(__filename), postAPI__createItemInfo.name);

    let itemInfo = {};

    itemInfo = requestBody;

    return itemInfo;
}

/*********************************************************************
 * API
 ********************************************************************/
/**
 * get total number of Items
 */
router.get('/countTotal', function (req, res, next) {
    logger.debugStdOut(path.basename(__filename), 'getAPI(countTotal) ' );

    product.count({}, function (err, count) {
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

        product.find(findObject)
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
 * Create a new item
 */
router.post('/', function (req, res,next) {
    logger.debugStdOut(path.basename(__filename), 'Post Create Api(req.body) ' + JSON.stringify(req.body));

    logger.stream.write("IP:" + req.connection.remoteAddress + ", create api body: " +JSON.stringify(req.body));

    let postInfo = postAPI__createItemInfo(req.body);

    if(_.isEmpty(postInfo)) {
        res.status(status.BAD_REQUEST).json({"error": "Bad Request"});
    } else {
        product.create(postInfo, function (err, doc) {
            if (err) {
                res.status(status.INTERNAL_SERVER_ERROR).json({"error": "something is wrong"});
            } else {
                res.sendStatus(status.CREATED);
            }
        });
        
    }

});

/**
 * Update Api
 */
router.post('/:id/edit', function(req, res, next){
    logger.debugStdOut(path.basename(__filename), 'id ' + req.params.id);
    logger.debugStdOut(path.basename(__filename), 'req.body ' +  JSON.stringify(req.body));

    logger.stream.write("IP:" + req.connection.remoteAddress + ", id: " + req.params.id.toString() + ", edit request:" +JSON.stringify(req.body));

    if(apiParamMng.checkGetQueryParams(req.body, editAPI__acceptableEditParams)) {
        product.findOneAndUpdate({_id: req.params.id}, {$set: req.body})
            .exec(function (err) {
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
