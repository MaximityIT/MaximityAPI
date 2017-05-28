var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var plivo = require('plivo');
var SmsHelper = require('../libs/SmsHelper');

var User = require('../models/user');

router.get('/', function (req, res, next) {
   
    
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
        var params = {
            'src': user.smsphone || user.phone || '1111111111',
            'dst' : '85366387334',
            'text' : "Hello, how are you?"
        };
        SmsHelper.sendMessage(user.appID || 'mxb5917a61def02539', params, function (err, response) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
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





module.exports = router;