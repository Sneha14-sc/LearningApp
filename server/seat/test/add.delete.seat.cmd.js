'use strict';

//database
const mongoose = require('mongoose');
const configDB = require('../../config/database');
const seat = require('./../seat.model');
const async = require('async');

let argv = require('yargs')
    .command('create','create', function (yargs) {
        yargs.options({
            number:{
                demand:true,
                alias:'n',
                description:'number of creation goes here',
                type:'string'
            }
        }).help('help');
    })
    .command('delete','delete all categories')
    .help('help')
    .argv;

let command = argv._[0];

/**
 * create
 * @param number
 */
function create(number) {
    //TODO: set basicData and testData
    let basicData = {
    };

    let testData = {
    };

    async.times(number, function(n, next) {
        //TODO: set testData
        let seat = new seat(testData);

        seat.save(function (err) {
            if (err) {
                console.log('Can not create' + n);
                next(err);
            }
        });

    }, function(err) {
        console.log('Something is broken' + err.toString());
    });
}

/**
 * delete
 */
function deleteAll(){
    //clear test database
    seat.remove(function (err) {
        if (err) {
            console.log('remove error');
            throw err;
        }
    });
}

(function main(){
    mongoose.connect(configDB.url); // connect to our database

    if(command === 'create') {
        create(argv.number);
    }
    else if(command === 'delete'){
        deleteAll();
    } else {
        console.log('Invalid command:' + command);
    }

    console.log('finished');
})();
