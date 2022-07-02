import { FETCH_PRODUCTS } from "../types";

export const fetchProducts = () => async (dispatch) => {
	const res = await fetch(
		"https://obscure-crag-41018.herokuapp.com/products"
	);
	const data = await res.json();
	dispatch({
		type: FETCH_PRODUCTS,
		payload: data,
	});
};
