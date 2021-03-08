module.exports.home = function (req, res) {
	return res.render('alumni', {
		title: 'Alumni',
	});
};

const Alumni = require('../models/alumni');

async function addAlumni(req, res) {
	try {
		console.log(req.body);
		let alumni = new Alumni(req.body);
		let result = await alumni.save();
		res.redirect('/alumni');
	} catch (err) {
		console.log('Error to add alumni', err);
		res.status(500).send('Something wrong try later');
	}
}

async function getAllAlumni(req, res) {
	try {
		let alumnis = await Alumni.find({ approve: true });
		console.log('here', alumnis);
		res.status(200).send(alumnis);
	} catch (err) {
		console.log('Error occurred in getAllAlumni ', err);
		res.status(500).send('something went wrong');
	}
}

async function getAlumniByBatch(req, res) {
	try {
		let alumnis = await Alumni.find({ batch: req.params.batch, approve: true });
		res.status(200).send(alumnis);
	} catch (err) {
		console.log('Error occurred in getAlumniByBatch ', err);
		res.status(500).send('something went wrong');
	}
}

async function updateAlumniInfo(req, res) {
	try {
		let updatedAlumni = await Alumni.findOneAndUpdate({ _id: req.params.id }, req.body);
		res.status(200).send({ alumni: updatedAlumni });
	} catch (err) {
		console.log('Error occurred in updateAlumniInfo ', err);
		res.status(500).send('something went wrong');
	}
}

async function deleteAlumni(req, res) {
	try {
		console.log('id is ', req.params.id);
		let result = await Alumni.findOneAndDelete({ _id: req.params.id });
		res.status(200).send(`Alumni ID: ${result._id} deleted successfully`);
	} catch (err) {
		console.log('Error occurred in deleteResume ', err);
		res.status(500).send('something went wrong');
	}
}

module.exports.addAlumni = addAlumni;
module.exports.getAllAlumni = getAllAlumni;
module.exports.getAlumniByBatch = getAlumniByBatch;
module.exports.updateAlumniInfo = updateAlumniInfo;
module.exports.deleteAlumni = deleteAlumni;
