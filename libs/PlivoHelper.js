var plivo = require('plivo');

var SmsRecord = require('../models/sms_record');

var PlivoHelper = {};

PlivoHelper.sendMessage = function (params, cb) {
	//console.log(params);
    if (!params.dst.startsWith("853")) {
        return cb({title: 'An error occurred', error: 'Country code is not accept for Plivo'});
    }
    var p = plivo.RestAPI({
        authId: 'MAZMRLNGI4MJYXNJG2Y2',
        authToken: 'YzAzNmJjYzg2ZjY5ODkxMmFmMmViMjc1NWViMGVj'
    });
    p.send_message(params, function (status, response) {
        console.log('Status: ', status);
        console.log('API Response:\n', response);
        if (status != 202) {
        	return cb({title: 'An error occurred', error: 'Send message failed'});
        }
        return cb(null, {
            status: status,
            response: response
        });
    });
}

PlivoHelper.getDetail = function (params, cb) {
	var p = plivo.RestAPI({
            authId: 'MAZMRLNGI4MJYXNJG2Y2',
            authToken: 'YzAzNmJjYzg2ZjY5ODkxMmFmMmViMjc1NWViMGVj'
        });

    p.get_message(params, function (status, response) {
        console.log('Status: ', status);
        console.log('API Response:\n', response);
        if (status != 200) {
        	return cb({title: 'An error occurred', error: 'Get message detail failed'});
        }
        return cb(null, {
            status: status,
            response: response
        });
    });
}

PlivoHelper.getDetails = function (params, cb) {
	var p = plivo.RestAPI({
            authId: 'MAZMRLNGI4MJYXNJG2Y2',
            authToken: 'YzAzNmJjYzg2ZjY5ODkxMmFmMmViMjc1NWViMGVj'
        });
    var params = {
        //'record_id': '10ab7847-88d9-4c9b-a09c-ed85153f7d84', // Message UUID for which the details have to be retrieved
    };

    p.get_messages(params, function (status, response) {
        console.log('Status: ', status);
        console.log('API Response:\n', response);

        return cb(null, {
            status: status,
            response: response
        });
    });
}

module.exports = PlivoHelper;