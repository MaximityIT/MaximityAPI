var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}],
    salt: {type: String},
    appID: {type: String},
    appKey: {type: String}
});

schema.methods.setAppID = function(email, password) {
	this.salt = crypto.randomBytes(16).toString('hex');

  	this.appID = "mx" + crypto.pbkdf2Sync(email, this.salt, 1000, 8, 'sha512').toString('hex');

  	this.appKey = crypto.pbkdf2Sync(password, this.salt, 1000, 16, 'sha512').toString('hex');
};

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);