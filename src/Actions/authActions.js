import { AUTH } from "../types";
import * as api from "../Api/index.js";

export const signUp = (formData, history) => async (dispatch) => {
	try {
		//sign up the user
		const { data } = await api.signUp(formData);
		dispatch({ type: AUTH, data });

		history.push("/user");
	} catch (error) {
		console.log(error);
	}
};

export const signIn = (formData, history) => async (dispatch) => {
	try {
		// log in user
		const { data } = await api.signIn(formData);
		dispatch({ type: AUTH, data });

		history.push("/user");
	} catch (error) {
		console.log(error);
	}
};
