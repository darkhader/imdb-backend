const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session')


mongoose.connect("mongodb://darkhader:Hoanghiep98@ds115874.mlab.com:15874/imdbmini", { useNewUrlParser: true }, (err) => {
    if (err) console.log(err)
    else console.log("Success")

});
const movieRouter = require('./routers/movieRouter');
const actorRouter = require('./routers/actorRouter');
const reviewRouter = require('./routers/reviewRouter');
const userRouter = require('./routers/userRouter');
const authRouter = require('./routers/authRouter');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('./public'));
app.use(session({
	secret:"keybroadhero",
	resave:false,
	saveUninitialized:false,
	cookie:{
		secure:false,
		httpOnly:false,
		maxAge:7*24*60*60*1000
	}
}))
app.use(cors({ origin: [ "https://imdb-frontend.herokuapp.com", "http://localhost:3000" ], credentials: true }));
// app.use((req, res, next) => {
// 	res.setHeader("X-Frame-Options", "ALLOWALL");
// 	res.setHeader(
// 	  "Access-Control-Allow-Methods",
// 	  "POST, GET, PUT, DELETE, OPTIONS"
// 	);
  
// 	if (req.headers.origin) {
// 	  res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
// 	}
  
// 	res.setHeader("Access-Control-Allow-Credentials", true);
  
// 	res.setHeader(
// 	  "Access-Control-Allow-Headers",
// 	  "Authorization, Origin, X-Requested-With, Content-Type, Accept"
// 	);
// 	next();
//   });
// app.use(session({
// 	secret:"keybroadhero",
// 	resave:false,
// 	saveUninitialized:true,
// 	cookie:{
// 		secure:false,
// 		httpOnly:false,
// 		maxAge:7*24*60*60*1000
// 	}
// }))

app.get("/api", (req, res) => {

});
//api/images
app.use("/api/movies",movieRouter );
app.use("/api/reviews", reviewRouter);
app.use("/api/actors", actorRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

// Middleware
app.use((req, res, next) => {
	console.log("404");
	res.send("404");
});

const port =process.env.PORT ||  9999;
app.listen(port, (err) => {
	if(err) console.log(err)
	else console.log("Listen at port " + port);
});
