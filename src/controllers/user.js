const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const User = require("../models/user");
const user = require("../models/user");

function signUp(req, res) {
	const user = new User();
	const { name, lastname, email, password, repeatPassword } = req.body;
	user.name = name;
	user.lastname = lastname;
	user.email = email.toLowerCase();
	user.role = "admin";
	user.active = false;

	if (!password || !repeatPassword) {
		res.status(404).send({ message: "Las contraseñas son obligatorias" });
	} else {
		if (password !== repeatPassword) {
			res.status(404).send({ message: "Las contraseñas no coniciden" });
		} else {
			bcrypt.hash(password, null, null, (err, hash) => {
				if (err) {
					res.status(500).send({ message: "Error al encriptar la contraseña" });
				} else {
					user.password = hash;
					user.save((err, UserStored) => {
						if (err) {
							res.status(500).send({ message: "El usuario ya existe" });
						} else {
							if (!UserStored) {
								res.status(404).send({ message: "Error al crear el usuario" });
							} else {
								res.status(200).send({ user: UserStored });
							}
						}
					});
				}
			});

			//res.status(200).send({ message: "User created" });
		}
	}
}

function signIn(req, res) {
	const params = req.body;
	const email = params.email.toLowerCase();
	const password = params.password;

	User.findOne({ email }, (err, userStored) => {
		if (err) {
			res.status(500).send({ message: "Error del servidor" });
		} else {
			if (!userStored) {
				res.status(404).send({ message: "Usuario no encontrado" });
			} else {
				bcrypt.compare(password, userStored.password, (err, check) => {
					if (err) {
						res.status(500).send({ message: "Error del servidor" });
					} else if (!check) {
						res.status(404).send({ message: "Datos incorrectos" });
					} else {
						if (!userStored.active) {
							res
								.status(200)
								.send({ code: 200, message: "El usuario no esta activo" });
						} else {
							res.status(200).send({
								accessToken: jwt.createAccessToken(userStored),
								refreshToken: jwt.createRefreshToken(userStored),
							});
						}
					}
				});
			}
		}
	});
}

function getUsers(req, res) {
	User.find().then((users) => {
		if (!users) {
			res.status(404).send({ message: "No se han encontrado usuarios" });
		} else {
			res.status(200).send({ users });
		}
	});
}
function getUsersActive(req, res) {
	console.log(req);
	const query = req.query;

	User.find({ active: query.active }).then((users) => {
		if (!users) {
			res.status(404).send({ message: "No se han encontrado usuarios" });
		} else {
			res.status(200).send({ users });
		}
	});
}

function uploadAvatar(req, res) {
	const params = req.params;

	User.findById({ _id: params.id }, (err, userData) => {
		if (err) {
			res.status(500).send({ message: "Error del servidor" });
		} else {
			if (!userData) {
				res.status(404).send({ message: "No se ha encontrado ningun usuario" });
			} else {
				let user = userData;

				if (req.files) {
					let filePath = req.files.avatar.path;
					let fileSplit = filePath.split("\\");
					let fileName = fileSplit[2];
					let extSplit = fileName.split(".");
					let fileExt = extSplit[1];
					console.log(fileName);
					if (
						fileExt !== "png" &&
						fileExt !== "PNG" &&
						fileExt !== "jpg" &&
						fileExt !== "JPG" &&
						fileExt !== "JPEG"
					) {
						res.status(400).send({
							message:
								"La extension de la imagen no es valida. (png, jpg, JPEG)",
						});
					} else {
						user.avatar = fileName;
						User.findByIdAndUpdate(
							{ _id: params.id },
							user,
							(err, userResult) => {
								if (err) {
									res.status(500).send({ message: "Error del servidor" });
								} else {
									if (!userResult) {
										res
											.status(404)
											.send({ message: "No ha encontrado ningun usuario" });
									} else {
										res.status(200).send({ avatarName: fileName });
									}
								}
							}
						);
					}
				}
			}
		}
	});
}

function getAvatar(req, res) {
	const avatarName = req.params.avatarName;
	const filePath = "./uploads/avatar/" + avatarName;

	fs.access(filePath, fs.constants.F_OK, (exists) => {
		if (exists) {
			res.status(404).send({ message: "El avatar no existe" });
		} else {
			res.sendFile(path.resolve(filePath));
		}
	});
}

async function updateUser(req, res) {
	let userData = req.body;
	userData.email = req.body.email.toLowerCase();
	const params = req.params;

	if (userData.password) {
		await bcrypt.hash(userData.password, null, null, (err, passHash) => {
			if (err) {
				res.status(500), send({ message: "Error al encriptar la contraseña" });
			} else {
				userData.password = passHash;
			}
		});
	}

	User.findByIdAndUpdate({ _id: params.id }, userData, (err, user) => {
		if (err) {
			res.status(500), send({ message: "Error del servidor" });
		} else {
			if (!user) {
				res.status(404).send({ message: "No se ha encontrado ningun usuario" });
			} else {
				res.status(200).send({ message: "Usuario actualizado correctamente" });
			}
		}
	});
}

function activateUser(req, res) {
	const { id } = req.params;
	const { active } = req.body;

	User.findByIdAndUpdate(id, { active }, (err, user) => {
		if (err) {
			res.status(500).send({ message: "Error del servidor" });
		} else {
			if (!user) {
				res.status(404).send({ message: "No se ha encontrado el usuario" });
			} else {
				if (active === true) {
					res
						.status(200)
						.send({ message: "El usuario fue activado correctamente" });
				} else {
					res
						.status(200)
						.send({ message: "Usuario desactivado correctamente" });
				}
			}
		}
	});
}

function deleteUser(req, res) {
	const { id } = req.params;

	User.findByIdAndDelete(id, (err, user) => {
		if (err) {
			res.status(500).send({ message: "Error del servidor" });
		} else {
			if (!user) {
				res.status(404).send({ message: "Usuario no encontrado" });
			} else {
				res.status(200).send({ message: "Usuario eliminado correctamente" });
			}
		}
	});
}

function signUpAdmin(req, res) {
	const user = new User();

	const { name, lastname, email, role, password } = req.body;

	user.name = name;
	user.lastname = lastname;
	user.email = email.toLowerCase();
	user.role = role;
	user.active = true;

	if (!password) {
		res.status(500).send({ message: "La contraseña es obligatoria" });
	} else {
		bcrypt.hash(password, null, null, (err, passHash) => {
			if (err) {
				res.status(500).send({ message: "Error al encriptar la contraseña" });
			} else {
				user.password = passHash;

				user.save((err, userSaved) => {
					if (err) {
						res.status(500).send({ message: "El usuario ya existe" });
					} else {
						if (!userSaved) {
							res
								.status(500)
								.send({ message: "Error al crear el nuevo usuario" });
						} else {
							res.status(200).send({ message: "Usuario creado correctamente" });
						}
					}
				});
			}
		});
	}
}

module.exports = {
	signUp,
	signIn,
	getUsers,
	getUsersActive,
	uploadAvatar,
	getAvatar,
	updateUser,
	activateUser,
	deleteUser,
	signUpAdmin,
};
