const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
	movie: { type:Schema.Types.ObjectId, ref: "movie" },
	content:{type:String},
	user: {type: Schema.Types.ObjectId, ref: "User"}
},
{
    timestamps:true
});
module.exports = mongoose.model("review", reviewSchema);