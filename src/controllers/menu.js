const menu = require("../models/menu");
const Menu = require("../models/menu");

function addMenu(req, res) {
	const { title, url, order, active } = req.body;

	const menu = new Menu();

	menu.title = title;
	menu.url = url;
	menu.order = order;
	menu.active = active;

	menu.save((err, menuSaved) => {
		if (err) {
			res.status(500).send({ message: "Error del servidor" });
		} else {
			if (!menuSaved) {
				res.status(404).send({ message: "Error al crear el menu" });
			} else {
				res.status(200).send({ message: "Menu creado correctamente!" });
			}
		}
	});
}

function getMenus(req, res) {
	Menu.find()
		.sort({ order: "asc" })
		.exec((err, menusStored) => {
			if (err) {
				res.status(500).send({ message: "Error del servidor" });
			} else {
				if (!menusStored) {
					res.status(404).send({
						message: "No se han encontrado ningun elemneto en el menu",
					});
				} else {
					res.status(200).send({ menus: menusStored });
				}
			}
		});
}

function updateMenu(req, res) {
	let menuData = req.body;
	const params = req.params;

	Menu.findByIdAndUpdate(params.id, menuData, (err, menuUpdate) => {
		if (err) {
			res.status(500).send({ message: "Error del servidor" });
		} else {
			if (!menuUpdate) {
				res.status(404).send({ message: "No se ha encontrado el menu " });
			} else {
				res.status(200).send({ message: "Menu actualizado correctamente!" });
			}
		}
	});
}

function activateMenu(req, res) {
	const { id } = req.params;
	const { active } = req.body;

	Menu.findByIdAndUpdate(id, { active }, (err, activedMenu) => {
		if (err) {
			res.status(500).send({ message: "Error del servidor" });
		} else {
			if (!activedMenu) {
				res.status(404).send({ message: "No se ha encontrado el menu" });
			} else {
				if (!active === true) {
					res.status(200).send({ message: "Menu activado correctamente!" });
				} else {
					res.status(200).send({ message: "Menu desactivado correctamente!" });
				}
			}
		}
	});
}

function deleteMenu(req, res) {
	const { id } = req.params;

	Menu.findByIdAndRemove(id, (err, menuDel) => {
		if (err) {
			res.status(500).send({ message: "Error del servidor" });
		} else {
			if (!menuDel) {
				res.status(404),
					send({ message: "El menu que intentas eliminar ya no existe!" });
			} else {
				res.status(200).send({ message: "Menu eliminado correctamente!" });
			}
		}
	});
}

module.exports = {
	addMenu,
	getMenus,
	updateMenu,
	activateMenu,
	deleteMenu,
};
