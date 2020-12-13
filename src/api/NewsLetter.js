import { API_VERSION, BASE_PATH } from "./config";

export function suscribeNewsLetter(email) {
	const url = `${BASE_PATH}/${API_VERSION}/suscribe-newsletter/${email.toLowerCase()}`;

	const params = {
		method: "POST",
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
