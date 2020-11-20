const mongoose = require("mongoose");
const app = require("./app");

const PORT_SERVER = process.env.PORT || 3001;

const { API_VERSION, IP_SERVER, PORT_DB } = require("./config");

mongoose.set("useFindAndModify", false);
//`mongodb://${IP_SERVER}:${PORT_DB}/personalweb`
mongoose.connect(
	`mongodb+srv://Moises717:moises1998@cluster0.k4bmy.mongodb.net/<dbname>?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	},
	(err, res) => {
		if (err) {
			throw err;
		} else {
			console.log("DB CONNECTED");
			app.listen(PORT_SERVER, () => {
				console.log("#########################");
				console.log("####### API REST ########");
				console.log("#########################");
				console.log(`http://${IP_SERVER}:${PORT_SERVER}/api/${API_VERSION}`);
			});
		}
	}
);
