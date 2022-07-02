const { CREATE_MAIL } = require("../types");

const maillistReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_MAIL:
			return {
				email: action.payload,
			};
		default:
			return state;
	}
};

export { maillistReducer };
