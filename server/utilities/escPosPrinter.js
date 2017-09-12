const escpos = require('escpos');


var utilPrint = {};
utilPrint.print= function(printText){console.log(printText);};


if (escpos.USB.findPrinter().length){


    const device  = new escpos.USB();
    console.log(device);
    const printer = new escpos.Printer(device);



    utilPrint.print = function (printText) {

        device.open(function () {
            printer.font('a');
            printer.align('ct');
            printer.text(printText);
            printer.cut();
            printer.close();

        });

    };
}
//TODO: reconnect to printer; connect after unplug;
//TODO: format print message.

// const device  = new escpos.Network('localhost');
// const device  = new escpos.Serial('/dev/usb/lp0');





module.exports=utilPrint;