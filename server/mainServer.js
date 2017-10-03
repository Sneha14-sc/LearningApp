
const express  = require('express');
const app      = express();
const bodyParser   = require('body-parser');
//for logging & debug
const path = require('path');
// for socket io
const server = require('http').Server(app);
const io = require('socket.io')(server);
//

/**
 * Constant Value
 */
const PORT    = 8080;

app.disable('x-powered-by');   // for security

app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',express.static('../client'));

//Route
//ensure all routing handle by angularjs:
// app.get('/*', function(req, res){
//     res.sendFile('index.html',{ root: path.join(__dirname, '../client') });
// });

server.listen(PORT);
console.log('The magic happens on port ' + PORT);
io.on('connection', function (socket) {
    console.log('client connected');
    socket.emit('news', { hello: 'world' });
    socket.on('client:addedItem', function (data) {

        console.log(JSON.stringify(data));
        printUtil.print(JSON.stringify(data));
        io.sockets.emit('clientRecieved:addedItem', data);// broadcast to all pipe
    });

    socket.on('kitchen:doneOrder', function (data) {
        printUtil.print(JSON.stringify(data));
    });

    socket.on('disconnect', function() {
        console.log('Client disconnected.');
    });
});

/**
 * Module dependencies
 */
/*Plan B:*/
// const express  = require('express');
// const app      = express();
// const status = require('http-status');
// const mongoose = require('mongoose');
// const bodyParser   = require('body-parser');
//
// const configDB = require('./config/database');
//
// //for logging & debug
// const logger = require('./utilities/logger');
// const path = require('path');
// logger.debugStdOut(path.basename(__filename), 'Start Debug Mode');
//
// // pre-render io for seo
// // if(require('./config/auth').runningMode==200) {
// //     var prerenderIO=require('prerender-node').set('prerenderToken', require('./config/auth').prerenderToken)
// //         prerenderIO=prerenderIO.set('protocol','https');
// //     app.use(prerenderIO);
// // }
// /**
//  * Constant Value
//  */
// const PORT    = 8080;
// mongoose.connect(configDB.url); // connect to our database
//
// app.disable('x-powered-by');   // for security
//
// app.use(bodyParser.json()); // get information from html forms
// app.use(bodyParser.urlencoded({ extended: true }));
//
// app.use('/',express.static('../client'));
//
// //Route
// var demoRoute = require('./demo/demo.route');
// app.use('/api/demo',demoRoute);
//
// //ensure all routing handle by angularjs:
// app.get('/*', function(req, res){
//     res.sendFile('index.html',{ root: path.join(__dirname, '../client') });
// });
// //Error
// // Add the error logger after all middleware and routes so that
// // it can log errors from the whole application. Any custom error
// // handlers should go after this.
// app.use(logger.errorLogger);
//
// // Basic 404 handler
// app.use( function(req, res) {
//     res.status(status.NOT_FOUND).send('Not Found');
// });
//
// // Basic error handler
// app.use( function(err, req, res) {
//     // If our routes specified a specific response, then send that. Otherwise,
//     // send a generic message so as not to leak anything.
//     res.status(status.INTERNAL_SERVER_ERROR).send(err.response || 'Something broke!');
// });
//
// // launch ======================================================================
// //Initialize and start app
// // OrderedSeatDbCtrl.InitOrderedSeat(function(err){
// //     if(err) {
// //         console.log('Can not Initialize to start server');
// //     } else {
// //         app.listen(PORT);
// //         console.log('The magic happens on port ' + PORT);
// //     }
// // });
//
// app.listen(PORT);
// console.log('The magic happens on port ' + PORT);
//
