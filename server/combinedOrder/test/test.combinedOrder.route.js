'use strict';

/**
 * Module dependencies
 */
//database
const mongoose = require('mongoose');
const combinedOrder = require('../combinedOrder.model');
const async = require('async');

//http
const superagent = require('superagent');
const express = require('express');
const httpStatus = require('http-status');
const assert = require('assert');

/**
 * Constant variable
 */
const URL_ROOT = 'http://localhost:3000';

describe('combinedOrder API tests', function() {
    let testcombinedOrderFirstData = {
        //general information
        _id:'1234', //use for regi

        //position information
        seatNumber:9,
        seatType:1,

    };

    /*
    * Setup before each test
    */
    beforeEach(function (done) {
        let combinedOrder1 = new combinedOrder(testcombinedOrderFirstData);

        combinedOrder1.save(function (err) {
            if (err) {
                console.log('Can not create combined Order1');
                throw  err;
            }
            done();
        });
    });

    /**
     * Setup after each test
     */
    afterEach(function (done) {
        //clear database
        combinedOrder.remove(function (err) {
            if (err) {
                console.log('Order remove error');
                throw err;
            }
            done();
        });
    });

    //get Api tests
    {
        /**
         * get combinedOrder with wrong parameter
         */
        it('[get /api/combinedOrder/?thanh=hello] response should be bad request', function (done) {
            let url = URL_ROOT+'/api/combinedOrder/?thanh=hello';
            superagent
                .get(url)
                .set('Content-Type', 'application/json')
                .end(function (error, res) {
                    //check res
                    assert.equal(res.status, httpStatus.BAD_REQUEST);

                    done();
                });
        });

        /**
         * get all combinedOrders
         */
        it('[get /api/combinedOrder/] response should be OK', function (done) {
            let url = URL_ROOT+'/api/combinedorder/';
            superagent
                .get(url)
                .set('Content-Type', 'application/json')
                .end(function (error, res) {
                    //check res
                    assert.equal(res.status, httpStatus.OK);

                    //check data
                    assert.equal(res.body[0].seatNumber, testcombinedOrderFirstData.seatNumber);

                    done();
                });
        });

        //get status
        it('[get /api/combinedOrder/?status=0] response should be OK', function (done) {
            let url = URL_ROOT+'/api/combinedorder/?status=0';
            superagent
                .get(url)
                .set('Content-Type', 'application/json')
                .end(function (error, res) {
                    //check res
                    assert.equal(res.status, httpStatus.OK);

                    //check data
                    assert.equal(res.body[0].seatNumber, testcombinedOrderFirstData.seatNumber);

                    done();
                });
        });
    }

    //create (post) Api tests
    {

    }

    //edit api tests
    {
        /**
         * edit status and listProduct
         */
        // it('[post /api/combined0rder/:orderID/edit] response should be OK', function (done) {
        //     let url = URL_ROOT+'/api/combinedorder/';
        //     superagent
        //         .get(url)
        //         .set('Content-Type', 'application/json')
        //         .end(function (error, res) {
        //             //check res
        //             assert.equal(res.status, httpStatus.OK);
        //
        //             let editUrl = URL_ROOT +'/api/combined0rder/' + res.body[0]._id + '/edit';
        //
        //             let updateObject = {
        //                 status:1,
        //                 // listProduct:[
        //                 //     {
        //                 //         name:'Pho',
        //                 //         price:500,
        //                 //         quantity:2
        //                 //     },
        //                 //     {
        //                 //         name:'BanhMy',
        //                 //         price:400,
        //                 //         quantity:2
        //                 //     },
        //                 // ],
        //             };
        //
        //             let JsonUpdateObject = JSON.stringify(updateObject);
        //
        //             console.log(JsonUpdateObject);
        //
        //             superagent
        //                 .post(editUrl)
        //                 .set('Content-Type', 'application/json')
        //                 .send(JsonUpdateObject)
        //                 .end(function (err, res) {
        //                     assert.ifError(error);
        //                     assert.equal(res.status, httpStatus.OK);
        //                     done();
        //
        //                     //check database
        //                     // combinedOrder.find({},function (error, foundItems) {
        //                     //     assert.equal(foundItems[0].status, 1);
        //                     //     // assert.equal(foundItems[0].listProduct[0].name, 'Pho');
        //                     //
        //                     //     done();
        //                     // });
        //                 });
        //         });
        // });
    }

});