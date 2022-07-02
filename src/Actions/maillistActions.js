import { CREATE_MAIL } from "../types";

export const sendMail = (email) => (dispatch) => {
	fetch("https://obscure-crag-41018.herokuapp.com/emails", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(email),
	})
		.then((res) => res.json())
		.then((data) => {
			dispatch({
				type: CREATE_MAIL,
				payload: data,
			});
		});
};
