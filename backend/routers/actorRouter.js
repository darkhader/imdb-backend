const express = require('express');
const ActorRouter = express.Router();
const ActorModel = require('../models/actorModel');

// Middleware

ActorRouter.post("/", async (req, res) => {
	
	const { name, dob, image, nationality } = req.body;
	try {
		const actorCreated = await ActorModel.create({  name, dob, image, nationality });
		res.status(201).json({ success: 1, actor: actorCreated, actorId:actorCreated._id  });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}

});
// ActorRouter.use((req, res, next) => {
// 	const { ActorInfo } = req.session;
// 	if (ActorInfo && ActorInfo.role >= 1) {
// 		next();
// 	} else res.status(404).json({ success: 0, message: "access deni" });
// })
// "/api/users" => get all
ActorRouter.get("/", async (req, res) => {
	console.log("Get all user");
	try {
		const actors = await ActorModel.find({});
		res.json({ success: 1, actors });
	} catch (error) {
		res.status(500).json({ success: 0, error: error })
	}

});

// get user by id
ActorRouter.get("/:id", async (req, res) => {
	let actorId = req.params.id;
	try {
		const actorFound = await ActorModel.findById(actorId);
		if (!actorFound) res.status(404).json({ success: 0, message: "Not found!" })
		else res.json({ success: 1, actor: actorFound });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}
});

// Create user


// Edit user
ActorRouter.put("/:id", async (req, res) => {
	const actorId = req.params.id;
	const {  name, dob, image, nationality } = req.body;

	try {
		const actorFound = await ActorModel.findById(actorId);
		if (!actorFound) {
			res.status(404).json({ success: 0, message: "Not found!" });
		} else {
			for (key in {  name, dob, image, nationality }) {
				if (actorFound["hashPassword"] && req.body["password"]) {
					const plainPassword = req.body["password"];
					const hashPassword = actorFound["hashPassword"];
					if (!bcrypt.compareSync(plainPassword, hashPassword)) {
						actorFound["hashPassword"] = bcrypt.hashSync(plainPassword, bcrypt.genSaltSync())
					}
				}
				if (actorFound[key] && req.body[key]) actorFound[key] = req.body[key];
			}
			let actorUpdated = await actorFound.save();
			res.json({ success: 1, user: actorUpdated });
		}
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}
});

// Delete user => BTVN
ActorRouter.delete("/:id", async (req, res) => {
	const actorId = req.params.id;
	try {
		ActorModel.remove({ _id: actorId });
		res.json({ success: 1 });
	} catch (error) {
		res.status(500).json({ success: 0, message: error })
	}
});

module.exports = ActorRouter;