const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema(
	{
		name: String,
		lastname: String,
		email: {
			type: String,
			unique: true,
		},
		password: String,
		role: String,
		active: Boolean,
		avatar: String,
	},
	{
		versionKey: false,
	}
);

module.exports = mongoose.model("User", UserSchema);
