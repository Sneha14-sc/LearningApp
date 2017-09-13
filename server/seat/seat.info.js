'use strict';

const SEAT_TYPE = {
    COUNTER:0,
    TABLE:1
};

const seatInfo = [
    //table
    {seatNumber:"0",  seatType:SEAT_TYPE.TABLE, tableNumber:1},
    {seatNumber:"10", seatType:SEAT_TYPE.TABLE, tableNumber:1},
    {seatNumber:"11", seatType:SEAT_TYPE.TABLE, tableNumber:1},
    {seatNumber:"12", seatType:SEAT_TYPE.TABLE, tableNumber:1},
    // {seatNumber:4, seatType:SEAT_TYPE.TABLE, tableNumber:1},
    // {seatNumber:5, seatType:SEAT_TYPE.TABLE, tableNumber:2},
    // {seatNumber:6, seatType:SEAT_TYPE.TABLE, tableNumber:2},
    // {seatNumber:7, seatType:SEAT_TYPE.TABLE, tableNumber:2},
    // {seatNumber:8, seatType:SEAT_TYPE.TABLE, tableNumber:2},

    //counter
    {seatNumber:"1", seatType:SEAT_TYPE.COUNTER, tableNumber:0},
    {seatNumber:"2", seatType:SEAT_TYPE.COUNTER, tableNumber:0},
    {seatNumber:"3", seatType:SEAT_TYPE.COUNTER, tableNumber:0},
    {seatNumber:"4", seatType:SEAT_TYPE.COUNTER, tableNumber:0},
    {seatNumber:"5", seatType:SEAT_TYPE.COUNTER, tableNumber:0},
    {seatNumber:"6", seatType:SEAT_TYPE.COUNTER, tableNumber:0},
    {seatNumber:"7", seatType:SEAT_TYPE.COUNTER, tableNumber:0},
    {seatNumber:"8", seatType:SEAT_TYPE.COUNTER, tableNumber:0},
    {seatNumber:"9", seatType:SEAT_TYPE.COUNTER, tableNumber:0},
];

module.exports.seatInfo = seatInfo;
