'use strict';

/**
 * Module dependencies
 */
//database
const mongoose = require('mongoose');
const configDB = require('./config/database');

//http
const express = require('express');
const bodyParser   = require('body-parser');

describe("Starting Test", function () {
    //set timeout for mocha
    this.timeout(5000);  //5ms

    let server;

    /**
     * Setup before all tests
     */
    before(function () {
        // connect to test database
        mongoose.connect(configDB.testURI); // connect to our database

        let app = express();

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        // start server
        //order Route
        let orderRoute = require('./order/order.route');
        app.use('/api/order',orderRoute);

        //combinedOrder Route
        let combinedOrderRoute = require('./combinedOrder/combinedOrder.route');
        app.use('/api/combinedOrder',combinedOrderRoute);

        server = app.listen(3000);

    });

    /**
     * Setup after all tests
     */
    after( function () {
        server.close();
    });

    //order route
    require('./order/test/test.order.route');

    // //combined order route
    // require('./combinedOrder/test/test.combinedOrder.route');


});
