import { CREATE_CONTACTS } from "../types";

export const createContact = (contact) => (dispatch) => {
	fetch("https://obscure-crag-41018.herokuapp.com/contacts", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(contact),
	})
		.then((res) => res.json())
		.then((data) => {
			dispatch({ type: CREATE_CONTACTS, payload: data });
		});
};
