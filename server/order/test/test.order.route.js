'use strict';

/**
 * Module dependencies
 */
//database
const mongoose = require('mongoose');
const Order = require('./../order.model');
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

describe('Order API Tests', function() {
    let testOrderFirstData = {
        _id:'abcdef_thanh',
        combinedOrderId:'1234',
        orderNumber:11,
        createBy:'Thanh',

        // Product information
        listProduct:[
            {
                name:'Pho',
                price:500,
                quantity:2
            },
            {
                name:'BanhMy',
                price:400,
                quantity:2
            },
        ],
    };

    /**
     * Setup before each test
     */
    beforeEach(function (done) {
        let order1 = new Order(testOrderFirstData);

        order1.save(function (err) {
            if (err) {
                console.log('Can not create order1');
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
        Order.remove(function (err) {
            if (err) {
                console.log('Order remove error');
                throw err;
            }
            done();
        });
    });

    //get api
    {
        /**
         * get order with wrong parameter
         */
        it('[get /api/order/?thanh=hello] response should be bad request', function (done) {
            let url = URL_ROOT+'/api/order/?thanh=hello';
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
         * get all orders
         */
        it('[get /api/order/] response should be OK', function (done) {
            let url = URL_ROOT+'/api/order/';
            superagent
                .get(url)
                .set('Content-Type', 'application/json')
                .end(function (error, res) {
                    //check res
                    assert.equal(res.status, httpStatus.OK);

                    //check data
                    assert.equal(res.body[0].listProduct[0].vn, testOrderFirstData.listProduct[0].vn);

                    done();
                });
        });

        /**
         * get by time
         */
        it('[get /api/order/?createdTime=yesterday&createdTime=tomorrow] response should be OK', function (done) {
            let yesterday = new Date();
            yesterday.setDate(yesterday.getDate() -1);

            let tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);

            let url = URL_ROOT+'/api/order/?' +'startCreatedTime=' + yesterday.toDateString() + '&endCreatedTime=' + tomorrow.toDateString();
            superagent
                .get(url)
                .set('Content-Type', 'application/json')
                .end(function (error, res) {
                    //check res
                    assert.equal(res.status, httpStatus.OK);

                    //check data
                    assert.equal(res.body[0].listProduct[0].vn, testOrderFirstData.listProduct[0].vn);

                    done();
                });
        });

    }

    //post api
    {
        /**
         * post api test (create a new order)
         */
        it('[post /api/order] post a new correct order', function (done) {
            let testOrderData = {
                _id:'abcdef_trung',
                combinedOrderId:'1234',
                createBy:'Thanh',

                // Product information
                listProduct:[
                    {
                        name:'testProduct1',
                        price:900,
                        quantity:2
                    },
                    {
                        name:'testProduct2',
                        price:800,
                        quantity:3
                    }
                ],
            };

            let testOrderJson = JSON.stringify(testOrderData);

            let url = URL_ROOT + '/api/order';
            superagent
                .post(url)
                .set('Content-Type', 'application/json')
                .send(testOrderJson)
                .end(function (error, res) {
                    assert.ifError(error);

                    //check res
                    assert.equal(res.status, httpStatus.CREATED);

                    //check database
                    Order.count({}, function (error, count) {
                        assert.ifError(error);
                        assert.equal(count, 2);
                        done();
                    });
                });

        });

        /**
         * create a new order with wrong price
         */
        // it('[post /api/order] post a new order with wrong price', function (done) {
        //     let testData = {
        //         // Product information
        //         listProduct:[{
        //             name:{
        //                 vn: 'BanhMy'
        //             },
        //             price:490,
        //             quantity:2
        //         }],
        //         // Customer information
        //         customer:{
        //             name:'Thanh3',
        //             email: 'makotovnjp@gmail.com',
        //             git tel: '08056152049',
        //             address:'Inuyama',
        //             postOfficeNumber:'484-0086'
        //         }
        //     };
        //
        //     var testDataJson = JSON.stringify(testData);
        //
        //     let url = URL_ROOT + '/api/order';
        //     superagent
        //         .post(url)
        //         .set('Content-Type', 'application/json')
        //         .send(testDataJson)
        //         .end(function (error, res) {
        //             //check res
        //             assert.equal(res.status, httpStatus.CONFLICT);
        //             done();
        //         });
        // });

        /**
         * post a wrong order
         */
        // it('[post /api/order] post a new wrong order', function (done) {
        //     let testData = {
        //         // Product information
        //         listProduct:[{
        //             name:{
        //                 vn: 'BanhMy'
        //             },
        //             price:500,
        //             quantity:2
        //         }],
        //         // Customer information
        //         customer:{
        //             email: 'makotovnjp@gmail.com',
        //             tel: '08056152049',
        //             address:'Inuyama',
        //             postOfficeNumber:'484-0086'
        //         }
        //     };
        //
        //     var testDataJson = JSON.stringify(testData);
        //
        //     let url = URL_ROOT + '/api/order';
        //     superagent
        //         .post(url)
        //         .set('Content-Type', 'application/json')
        //         .send(testDataJson)
        //         .end(function (error, res) {
        //             //check res
        //             assert.equal(res.status, httpStatus.BAD_REQUEST);
        //
        //             done();
        //         });
        // });
    }

    //edit api
    {
        /**
         * edit status
         */
        it('[post /api/order/:orderID/edit] response should be OK', function (done) {
            let url = URL_ROOT+'/api/order';
            superagent
                .get(url)
                .set('Content-Type', 'application/json')
                .end(function (error, res) {
                    //check res
                    assert.equal(res.status, httpStatus.OK);

                    let editUrl = URL_ROOT +'/api/order/' + res.body[0]._id + '/edit';

                    let updateObject = {
                        'status':2
                    };

                    let JsonUpdateObject = JSON.stringify(updateObject);
                    console.log(JsonUpdateObject);

                    superagent
                        .post(editUrl)
                        .set('Content-Type', 'application/json')
                        .send(JsonUpdateObject)
                        .end(function (err, res) {
                            assert.ifError(error);
                            assert.equal(res.status, httpStatus.OK);

                            //check database
                            Order.find({},function (error, foundItems) {
                                assert.equal(foundItems[0].status, 2);

                                done();
                            });
                        });
                });
        });
    }
});
