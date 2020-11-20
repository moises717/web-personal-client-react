const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CoursesSchema = new Schema(
	{
		idCourses: {
			type: Number,
			unique: true,
			required: true,
		},
		link: String,
		coupon: String,
		price: Number,
		order: Number,
	},
	{
		versionKey: false,
	}
);

module.exports = mongoose.model("Courses", CoursesSchema);
