import axios from 'axios';

export const POST_START = 'POST_START';
export const POST_SUCCESS = 'POST_SUCCESS';
export const POST_FAIL = 'POST_FAIL';
export const SET_CURRENT = 'SET_CURRENT';
export const CLEAR_CURRENT = 'CLEAR_CURRENT';
export const SET_LOADING = 'SET_LOADING';
export const ADD_POST = 'ADD_POST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAIL = 'ADD_POST_FAIL';
export const DELETE_POST = 'DELETE_POST';

export const getPosts = () => (dispatch) => {
	dispatch({ type: POST_START });

	// GET posts
	return axios
		.get(`http://localhost:4000/api/posts`)
		.then((res) => {
			console.log('get all posts action', res.data);
			dispatch({ type: POST_SUCCESS, payload: res.data });
		})
		.catch((err) => {
			console.log('err', err);

			dispatch({
				type: POST_FAIL,
				payload: err,
			});
		});
};

// Add Post to db
export const addPost = (posts) => (dispatch) => {
	dispatch({ type: POST_START });
	axios
		.post(`http://localhost:4000/api/posts`, posts)
		.then((res) => {
			console.log('add POST', res);
			dispatch({ type: ADD_POST_SUCCESS, payload: res.data });
		})
		.catch((err) => {
			dispatch({ type: ADD_POST_FAIL, payload: err });
		});
};

//Delete  post from server
export const deletePost = (id) => (dispatch) => {
	console.log('delete post', id);
	dispatch({ type: DELETE_POST });

	axios
		.delete(`http://localhost:4000/api/posts/${id}`)
		.then((res) => {
			console.log('delete post:', res.data);
			dispatch({ type: DELETE_POST, payload: id });
		})
		.catch((err) => {
			dispatch({ type: POST_FAIL, payload: err });
		});
};

// Set current user
export const setCurrent = (posts) => {
	return {
		type: SET_CURRENT,
		payload: posts,
	};
};

// Clear current user
export const clearCurrent = () => {
	return {
		type: CLEAR_CURRENT,
	};
};

// Set Loading to true
export const setLoading = () => {
	return {
		type: SET_LOADING,
	};
};
