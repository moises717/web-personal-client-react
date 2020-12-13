import { BASE_PATH, API_VERSION } from "./config";

export function getMenuApi() {
	const url = `${BASE_PATH}/${API_VERSION}/get-menus`;

	return fetch(url)
		.then((res) => {
			return res.json();
		})
		.then((result) => {
			return result;
		})
		.catch((err) => {
			return err.message;
		});
}

export function updateMenuApi(token, menuId, data) {
	const url = `${BASE_PATH}/${API_VERSION}/update-menu/${menuId}`;

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
			return result.message;
		})
		.catch((err) => {
			return err;
		});
}

export function activateMenuApi(token, menuId, data) {
	const url = `${BASE_PATH}/${API_VERSION}/activate-menu/${menuId}`;

	const params = {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
		body: JSON.stringify({ active: data }),
	};

	return fetch(url, params)
		.then((res) => {
			return res.json();
		})
		.then((result) => {
			return result.message;
		})
		.catch((err) => {
			console.log(err);
		});
}

export function addMenuApi(token, menu) {
	const url = `${BASE_PATH}/${API_VERSION}/add-menu`;

	const params = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
		body: JSON.stringify(menu),
	};

	return fetch(url, params)
		.then((response) => {
			return response.json();
		})
		.then((result) => {
			return result.message;
		})
		.catch((err) => {
			console.log(err);
		});
}

export function deleteMenuApi(token, menuId) {
	const url = `${BASE_PATH}/${API_VERSION}/delete-menu/${menuId}`;

	const params = {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: token,
		},
	};

	return fetch(url, params)
		.then((res) => {
			return res.json();
		})
		.then((result) => {
			return result.message;
		})
		.catch((err) => {
			console.log(err);
		});
}
