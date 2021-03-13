const cloudinary = require('cloudinary').v2;

module.exports.home = function (req, res) {
	return res.render('alumni', {
		title: 'Alumni',
	});
};

const Alumni = require('../models/alumni');

async function addAlumni(req, res) {
	try{
		let file = req.file;
		let buffer = Buffer.from(file.buffer);
		cloudinary.uploader.upload_stream({
			use_filename : false,
			access_control : JSON.stringify({access_type : "anonymous"}),	
		}, async (clerr, clres) => {
			if(clerr){
				console.log(clerr);
				console.log("__________________");
				res.status(500).json({err : true});
			} else {
				try{
					console.log(clres);
					let {url} = clres;
					let toSave = {...req.body};
					toSave['imageURL'] = url; 
					let alumni = new Alumni(toSave);
					let result = await alumni.save();
					res.status(200).json({stored : true});
				} catch(err){
					console.log(err);
					res.status(500).json({err : "An internal server error occurred."});
				}
			}
		}).end(buffer);
	} catch(err){
		console.log(err);
		res.status(500).json({ err : "An internal server error occurred." });
	}
}

async function getAllAlumni(req, res) {
	try {
		let alumnis = await Alumni.find({ approve: true });
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
