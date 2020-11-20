const NewsLetter = require("../models/newsletter");

function suscribeEmail(req, res) {
	const { email } = req.params;
	const newLetter = new NewsLetter();

	if (!email) {
		res.status(404).send({ message: "El email es obligatorio", code: 404 });
	} else {
		newLetter.email = email.toLowerCase();
		newLetter.save((err, newletterSaved) => {
			if (err) {
				res.status(500).send({ code: 500, message: "Email ya existe!" });
			} else {
				if (!newletterSaved) {
					res.status(404).send({
						code: 404,
						message: "Error al registrar en la newsLetter",
					});
				} else {
					res
						.status(200)
						.send({ code: 200, message: "Email registrado correctamente" });
				}
			}
		});
	}
}

module.exports = {
	suscribeEmail,
};
