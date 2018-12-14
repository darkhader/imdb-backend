const express = require('express');
const MovieRouter = express.Router();
const MovieModel = require('../models/movieModel');
const ActorModel = require('../models/actorModel');
// Middleware




MovieRouter.get("/", async (req, res) => {
	console.log("Get all movies");
	var perPage = 4
	var page = req.query.page || 1;
	var sort = req.query.sort || 1;
	
	
	try {
		
		if(sort ==1){
			const movies = await MovieModel.find({})
		.skip(perPage * (page - 1))
		.limit(perPage).sort([['title', 1]]);
	
		
		const total = await MovieModel.count({});
		res.json({ success: 1, movies, total });
		}
		if(sort ==2){
			const movies = await MovieModel.find({})
		.skip(perPage * (page - 1))
		.limit(perPage).sort([['year', -1]]);
	
		
		const total = await MovieModel.count({});
		res.json({ success: 1, movies, total });
		}
		if(sort ==3){
			const movies = await MovieModel.find({})
		.skip(perPage * (page - 1))
		.limit(perPage).sort([["luotlike", -1]]);
	
		
		const total = await MovieModel.count({});
		res.json({ success: 1, movies, total });
		}
		if(sort ==4){
			const movies = await MovieModel.find({})
		.skip(perPage * (page - 1))
		.limit(perPage).sort({date:-1});
	
		
		const total = await MovieModel.count({});
		res.json({ success: 1, movies, total });
		}
	} catch (error) {
		res.status(500).json({ success: 0, error: error })
	}

});

// get user by id
MovieRouter.get("/:id", async (req, res) => {
	let movieId = req.params.id;
	try {
		const movieFound = await MovieModel.findById(movieId)
		.populate("actor", "name image")
		.populate("User", "name")
		.populate({
			path: "review",
			select: "content user",
			populate: {
				path: "user",
				model: "User"
			}
		});
		if (!movieFound) res.status(404).json({ success: 0, message: "Not found!" })
		else res.json({ success: 1, movie: movieFound });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}
});


MovieRouter.use((req, res, next) => {
	const { userFound } = req.session;
	console.log("req1",req.session);
	if (userFound && userFound.role >= 1) {
		
		
		next();
		
		
	} else res.status(401).json({ success: 0,message: userFound });
})
// Create user

MovieRouter.post("/", async (req, res) => {
	
	const { title, description, image, duration,year,review, actor } = req.body;
	try {
		const movieCreated = await MovieModel.create({  title, description, image, duration,year,review, actor });
		res.status(201).json({ success: 1, movie: movieCreated, movieId:movieCreated._id  });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}

});
// Edit user
MovieRouter.put("/:id", async (req, res) => {
	const movieId = req.params.id;
	const {actor,like,luotlike,review } = req.body;

	try {
		if(actor){
			const movieFound = await MovieModel.findByIdAndUpdate(movieId, {$push: {actor: actor }})
			let movieUpdated = await movieFound.save();
			res.json({ success: 1, user: movieUpdated });
		}
		if(like){
			const movieFound = await MovieModel.findByIdAndUpdate(movieId, {$push: {like: like }})
			let movieUpdated = await movieFound.save();
			res.json({ success: 1, user: movieUpdated });
		}
		if(luotlike){
			const movieFound = await MovieModel.findByIdAndUpdate(movieId, {luotlike})
			let movieUpdated = await movieFound.save();
			res.json({ success: 1, user: movieUpdated });
		}
		if(review){
			const movieFound = await MovieModel.findByIdAndUpdate(movieId,  {$push: {review: review }})
			let movieUpdated = await movieFound.save();
			res.json({ success: 1, user: movieUpdated });
		}
		

		
		
	} catch (error) {
		res.status(500).json({ success: 0, messageloi: error })
	}
});





MovieRouter.delete("/:id", (req, res) => {
	const movieId = req.params.id;
	MovieRouter.remove({ _id: movieId  }, (err) => {
		if(err) res.status(500).json({ success: 0, message: err})
		else res.json({ success: 1 });
	});
});

module.exports = MovieRouter;