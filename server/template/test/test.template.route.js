'use strict';

/**
 * Module dependencies
 */
//database
const mongoose = require('mongoose');
const template = require('../template.model');
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

describe('template API tests', function() {

    /*
    * Setup before each test
    */
    beforeEach(function (done) {
        done();
    });

    /**
     * Setup after each test
     */
    afterEach(function (done) {
        done();
    });

    //get Api tests
    {

    }

    //create (post) Api tests
    {

    }

    //edit api tests
    {

    }

});