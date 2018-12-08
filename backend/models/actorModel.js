const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActorSchema = new Schema({
	name: { type: String, required: true },
	dob: { type: String},
	image: { type: String, },
	nationality: { type: String  }
	
});

module.exports = mongoose.model("actor", ActorSchema);