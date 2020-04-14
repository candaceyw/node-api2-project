import {
	POST_START,
	POST_SUCCESS,
	POST_FAIL,
	SET_CURRENT,
	CLEAR_CURRENT,
	SET_LOADING,
	ADD_POST_SUCCESS,
	ADD_POST_FAIL,
	DELETE_POST,
	ADD_POST,
} from '../actions/postAction.js';

const initialState = {
	posts: [],
	loading: false,
	error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case POST_START:
			return {
				...state,
				loading: true,
				error: null,
			};
		case POST_SUCCESS:
			return {
				...state,
				posts: action.payload,
				loading: false,
				error: null,
			};
		case POST_FAIL:
			return {
				...state,
				posts: [],
				loading: false,
				error: action.payload,
			};
		case ADD_POST:
			return {
				...state,
				loading: true,
				error: '',
			};
		case ADD_POST_SUCCESS:
			return {
				...state,
				loading: false,
				posts: [...state.posts, action.payload],
			};
		case ADD_POST_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post.id !== action.payload),
				loading: false,
			};
		case SET_CURRENT:
			return {
				...state,
				current: action.payload,
			};

		case CLEAR_CURRENT:
			return {
				...state,
				current: null,
			};
		case SET_LOADING:
			return {
				...state,
				loading: true,
			};

		default:
			return state;
	}
};
