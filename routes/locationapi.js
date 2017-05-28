var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');

router.get('/', function (req, res, next) {

    const lat1 = 39.941;
    const lng1 = 116.45;
    var result = coordinateRange({lat: lat1, lng: lng1}, 500.0);
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