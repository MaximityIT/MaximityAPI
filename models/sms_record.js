var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    appID: {type: String, required: true},
    provider: {type: String, required: true},
    detail: {type: Schema.Types.Mixed},
    params: {type: Schema.Types.Mixed},
    response: {type: Schema.Types.Mixed}
});

schema.post('remove', function (message) {
    User.findById(message.user, function (err, user) {
        // user.messages.pull(message);
        // user.save();
    });
});

module.exports = mongoose.model('SmsRecord', schema);