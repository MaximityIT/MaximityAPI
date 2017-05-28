var PlivoHelper = require('../libs/PlivoHelper');

var SmsRecord = require('../models/sms_record');

var SmsHelper = {}

SmsHelper.sendMessage = function (authID, params, cb) {

	if (params.dst.startsWith("853") || params.dst.startsWith("86")) {
        PlivoHelper.sendMessage(params, function (err, response) {
            if (err) {
                return cb({
                    title: 'An error occurred',
                    error: err
                });
            }

            PlivoHelper.getDetail({record_id: response.response.message_uuid[0]}, function (err, detail) {

            	var smsRecord = new SmsRecord({
				    appID: authID,
				    provider: 'plivo',
				    detail: detail,
				    params: params,
				    response: response
	        	})
	        	smsRecord.save();
		        
		    })
		    cb(null, {
                message: 'Sent SMS message',
                obj: response
            });
            
        });
    }
}

module.exports = SmsHelper;