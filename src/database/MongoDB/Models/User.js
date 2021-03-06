const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const defaultOptions = require('../utils/defaultOptions');
const { enums } = require('utils');

const bcrypt = require('bcrypt');
const { Address } = require('./embedded');
const {
	bcrypt: { rounds },
} = require('config-keys');
// TODO: Specify enums
const UserSchema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String },
		password: {
			type: String,
			required: true,
			trim: true,
			select: false,
			set: (val) => (val ? bcrypt.hashSync(val, rounds) : undefined),
		},
		phone: { type: String, unique: true, required: true },
		addresses: { type: [Address], required: true },
		avatar: { type: Schema.Types.ObjectId, ref: 'File' },
		verificationCode: { type: String, select: false },
		verified: { type: Boolean, required: true, default: false },
		verifyAttempts: { type: [Date], select: false },
		type: { type: String, enums: enums.User.Types, required: true },

	},
	defaultOptions()
);

UserSchema.virtual('name').get(function () {
	return this.firstName + ' ' + this.lastName;
});

UserSchema.methods.verifyPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema, 'User');
