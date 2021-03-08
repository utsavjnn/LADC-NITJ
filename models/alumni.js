const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	linkedin: {
		type: String,
		required: true,
	},
	batch: {
		type: String,
		required: true,
	},
	approve: {
		type: Boolean,
		default: false,
	},
	imageURL: {
		type: String,
		default: null,
	},
});

const Alumni = mongoose.model('Alumni', alumniSchema);
module.exports = Alumni;
