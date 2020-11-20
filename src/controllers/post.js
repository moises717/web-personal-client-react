const Post = require("../models/post");

function addPost(req, res) {
	const body = req.body;
	const post = new Post(body);

	post.save((err, postSaved) => {
		if (err) {
			res.status(500).send({ code: 500, message: "La url ya existe." });
		} else {
			if (!postSaved) {
				res
					.status(404)
					.send({ code: 400, message: "Non se ha creado el post." });
			} else {
				res
					.status(200)
					.send({ code: 200, message: "Post creado correctamente." });
			}
		}
	});
}

function getPosts(req, res) {
	const { page = 1, limit = 10 } = req.query;

	const option = {
		page,
		limit: parseInt(limit),
		sort: { date: "desc" },
	};

	Post.paginate({}, option, (err, posts) => {
		if (err) {
			res.status(500).send({ code: 500, message: "Error del servidor" });
		} else {
			if (!posts) {
				res
					.status(404)
					.send({ code: 404, message: "No se ha encontrado ningun post" });
			} else {
				res.status(200).send({ code: 200, posts: posts });
			}
		}
	});
}

function updatePost(req, res) {
	const postData = req.body;
	const id = req.params.id;

	Post.findByIdAndUpdate(id, postData, (err, postUpdated) => {
		if (err) {
			res.status(500).send({ code: 500, message: "Error del servidor" });
		} else {
			if (!postUpdated) {
				res
					.status(404)
					.send({ code: 404, message: "No se ha encontrado el post" });
			} else {
				res
					.status(200)
					.send({ code: 200, message: "Post actualizado correctamente." });
			}
		}
	});
}

function deletePost(req, res) {
	const { id } = req.params;

	Post.findByIdAndRemove(id, (err, postDel) => {
		if (err) {
			res.status(500).send({ code: 500, message: "Error del servidor" });
		} else {
			if (!postDel) {
				res
					.status(404)
					.send({ code: 404, message: "No se ha encontrado el post" });
			} else {
				res
					.status(200)
					.send({ code: 200, message: "Post eliminado correctamente." });
			}
		}
	});
}

function getPost(req, res) {
	const { url } = req.params;

	Post.findOne({ url }, (err, postStored) => {
		if (err) {
			res.status(500).send({ code: 500, message: "Error del servidor" });
		} else {
			if (!postStored) {
				res.status(404).send({ code: 404, message: "Post no encontrado!" });
			} else {
				res.status(200).send({ code: 200, post: postStored });
			}
		}
	});
}

module.exports = {
	addPost,
	getPosts,
	updatePost,
	deletePost,
	getPost,
};
