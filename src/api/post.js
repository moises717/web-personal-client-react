import { API_VERSION, BASE_PATH } from "./config";

export function getPostApi(limit, page) {
	const url = `${BASE_PATH}/${API_VERSION}/get-posts?limit=${limit}&page=${page}`;

	return fetch(url)
		.then((res) => {
			return res.json();
		})
		.then((result) => {
			return result;
		})
		.catch((err) => {
			return err;
		});
}

export function deletePostApi(token, id) {
	const url = `${BASE_PATH}/${API_VERSION}/delete-post/${id}`;

	const params = {
		method: "DELETE",
		headers: {
			"Content-Type": "Application/json",
			Authorization: token,
		},
	};

	return fetch(url, params)
		.then((res) => {
			return res.json();
		})
		.then((result) => {
			return result;
		})
		.catch((err) => {
			return err;
		});
}

export function addPostApi(token, post) {
	const url = `${BASE_PATH}/${API_VERSION}/add-post`;

	const params = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
		body: JSON.stringify(post),
	};

	return fetch(url, params)
		.then((res) => {
			return res.json();
		})
		.then((result) => {
			return result;
		})
		.catch((err) => {
			return err;
		});
}

export function updatePostApi(token, id, data) {
	const url = `${BASE_PATH}/${API_VERSION}/update-post/${id}`;

	const params = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
		body: JSON.stringify(data),
	};

	return fetch(url, params)
		.then((res) => {
			return res.json();
		})
		.then((result) => {
			return result;
		})
		.catch((err) => {
			return err;
		});
}

export function getPostSApi(urlp) {
	const url = `${BASE_PATH}/${API_VERSION}/get-post/${urlp}`;

	return fetch(url)
		.then((res) => {
			return res.json();
		})
		.then((result) => {
			return result;
		})
		.catch((err) => {
			return err;
		});
}
