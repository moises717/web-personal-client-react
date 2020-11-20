const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const { config, API_VERSION } = require("./config");

//Routings
const authRoutes = require("./routes/auth");
const UserRoutes = require("./routes/user");
const MenuRoutes = require("./routes/menu");
const NewsLetterRoutes = require("./routes/newsletter");
const CourseRoutes = require("./routes/course");
const PostRoutes = require("./routes/post");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Configure Header HTTP
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
	next();
});

//Basic Router
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, UserRoutes);
app.use(`/api/${API_VERSION}`, MenuRoutes);
app.use(`/api/${API_VERSION}`, NewsLetterRoutes);
app.use(`/api/${API_VERSION}`, CourseRoutes);
app.use(`/api/${API_VERSION}`, PostRoutes);

module.exports = app;
