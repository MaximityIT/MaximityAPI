var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var plivo = require('plivo');

var User = require('../models/user');

router.get('/', function (req, res, next) {
    // var p = plivo.RestAPI({
    //         authId: 'MAZMRLNGI4MJYXNJG2Y2',
    //         authToken: 'YzAzNmJjYzg2ZjY5ODkxMmFmMmViMjc1NWViMGVj'
    //     });
    // var params = {
    //     //'record_id': '10ab7847-88d9-4c9b-a09c-ed85153f7d84', // Message UUID for which the details have to be retrieved
    // };

    // p.get_messages(params, function (status, response) {
    //     console.log('Status: ', status);
    //     console.log('API Response:\n', response);
    //     res.status(200).json({
    //         message: 'get SMS message',
    //         obj: response
    //     });
    // });
    const lat1 = 39.941;
    // const lat2 = 39.94;
    const lng1 = 116.45;
    // const lng2 = 116.451;
    var startDate = new Date();
    // var dx = lng1 - lng2; // 经度差值
    // var dy = lat1 - lat2; // 纬度差值
    // var b = (lat1 + lat2) / 2.0; // 平均纬度
    // var Lx = toRadians(dx) * 6367000.0* Math.cos(toRadians(b)); // 东西距离
    // var Ly = 6367000.0 * toRadians(dy); // 南北距离
    // var d = Math.sqrt(Lx * Lx + Ly * Ly);
    var endDate   = new Date();
    var result = coordinateRange({lat: lat1, lng: lng1}, 500.0);
    console.log((endDate.getTime() - startDate.getTime()));
    res.status(201).json({
        message: 'Sent SMS message',
        obj: result  // 用平面的矩形对角距离公式计算总距离
    });
    
});

router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var p = plivo.RestAPI({
            authId: 'MAZMRLNGI4MJYXNJG2Y2',
            authToken: 'YzAzNmJjYzg2ZjY5ODkxMmFmMmViMjc1NWViMGVj'
        });
        var params = {
            'src': '1111111111',
            'dst' : '85365699055',
            'text' : "Hello, how are you?"
        };
        p.send_message(params, function (status, response) {
            console.log('Status: ', status);
            console.log('API Response:\n', response);
            res.status(201).json({
                message: 'Sent SMS message',
                obj: response
            });
        });
    });
});

router.patch('/:id', function (req, res, next) {

});

router.delete('/:id', function (req, res, next) {

});

function toRadians(angel) {
    return Math.abs(angel) * Math.PI/180.0;
}

function toDegrees(radian) {
    return Math.abs(radian) * 180.0 / Math.PI;
}

function coordinateRange(coordinate, distance) {
    var dDegree = toDegrees(distance / 6367000.0);
    var dLng = toDegrees( distance / ( 6367000.0 * Math.cos(toRadians(coordinate.lat))) )
    return {
        degree : dDegree.toFixed(6),
        maxLat : (coordinate.lat + dDegree).toFixed(6),
        minLat : (coordinate.lat - dDegree).toFixed(6),
        maxLng : (coordinate.lng + dLng).toFixed(6),
        minLng : (coordinate.lng - dLng).toFixed(6)
    }
}

module.exports = router;