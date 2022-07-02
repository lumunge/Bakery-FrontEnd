const { CREATE_CONTACTS } = require("../types");

const contactReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_CONTACTS:
			return {
				contact: action.payload,
			};
		default:
			return state;
	}
};

export { contactReducer };
