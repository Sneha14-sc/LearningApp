/**
 * Created by dp on 5/22/17.
 */
var socketUtil={};
socketUtil.counters={orderNsp:0,combinedOrderNsp:0};

socketUtil.setUpSocketIo= function(server){
    "use strict";
    /**
     * @server : instance of serve created  by express;
     */
    var numOfsockets_order=0;
    var numOfsockets_combinedOrders =0;
    socketUtil.io = require('socket.io')(server);
    socketUtil.orderNsp = socketUtil.io.of('/orderNsp');
    socketUtil.combinedOrderNsp =socketUtil.io.of('/combinedOrderNsp');
    socketUtil.counters={orderNsp:0,combinedOrderNsp:0};

    socketUtil.orderNsp.on('connection', function(socket) {
        numOfsockets_order += 1;
        console.log('someone connected. ' + numOfsockets_order+ ' orderNps');
        socket.emit('init_orderNsp',{counter:socketUtil.counters.orderNsp});

        socket.on('disconnect', function () {
            numOfsockets_order -= 1;
            console.log('Client disconnected orderNsp. ' + numOfsockets_order + 'clients connected');
        });

    });

    socketUtil.combinedOrderNsp.on('connection', function(socket){

        numOfsockets_combinedOrders+=1;
        console.log('someone connected.'+ numOfsockets_combinedOrders+ ' clients connected combinedOrderNsp');
        socket.emit('init_combinedOrderNsp',{counter:socketUtil.counters.combinedOrderNsp});
        //test
        //socketUtil.publish('combinedOrderNsp','hello');
    socket.on('disconnect', function () {
        numOfsockets_combinedOrders-= 1;
        console.log('Client disconnected combinedOrderNsp.'+numOfsockets_combinedOrders +' clients connected');
    });
    });

}

/**
 *
 * @param socketNsp: {string} repsent Nsp that need to publish information
 * @param msg: {object} message object need to deliver
 * @param actionName {string} optional. name of action /emit event ;
 * function broadcasts message with given event name to all client connecting to the namespace
 */
socketUtil.publish=function(socketNsp,msg,actionName){
    "use strict";
    if (socketUtil.hasOwnProperty(socketNsp)){
        var nsp = socketUtil[socketNsp];
        socketUtil.counters[socketNsp]+=1;
        actionName=actionName||'newUpdates';
        console.log('sent to'+ socketNsp);
        //console.log(msg);
        nsp.emit(actionName,{msg:msg,counter:socketUtil.counters[socketNsp]});
    }
};
module.exports =socketUtil;


