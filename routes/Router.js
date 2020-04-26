//import express
const express = require('express');
const posts = require('../data/db');

// create express router.
const router = express.Router();

//GET - post list

router.get('/', (req, res) => {
	posts
		.find()
		.then((post) => {
			return res.status(200).json(post);
		})
		.catch((err) => {
			return res.status(500).json({ error: 'Error retrieving posts' });
		});
});

// When the client makes a `POST` request to `/api/posts`:
router.post('/', (req, res) => {
	if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			message: 'Please provide title and contents for the post.',
		});
	}
	posts
		.insert(req.body)
		.then((post) => {
			res.status(201).json(post);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: 'There was an error while saving the post to the database',
			});
		});
});

//GET - post list by Id
router.get('/:id', (req, res) => {
	posts
		.findById(req.params.id)
		.then((post) => {
			if (post.id !== []) {
				res.status(200).json(post);
			} else {
				res.status(404).json({
					message: 'The post with the specified ID does not exist.',
				});
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: 'The post information could not be retrieved.',
			});
		});
});

//`GET` request to `/api/posts/:id/comments`:
router.get('/:id/comments', (req, res) => {
	posts
		.findPostComments(req.params.id)
		.then((post) => {
			if (post.length) {
				res.status(200).json(post);
			} else {
				return res.status(404).json({
					message: 'The post with the specified ID does not exist.',
				});
			} //end if/else
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: 'The comments information could not be retrieved.',
			});
		});
});

// makes a `POST` request to `/api/posts/:id/comments`:
router.post('/:id/comments', (req, res) => {
	//if there's no text`
	if (!req.body.text) {
		res.status(400).json({
			errorMessage: 'Please provide text for the comment.',
		});
	}
	posts
		.insertComment(req.body)
		.then((post) => {
			// if there's no id match
			if (!post.id) {
				res.status(404).json({
					errorMessage: 'The post with the specified ID does not exist.',
				});
			} else {
				//success!
				res.status(201).json(post);
			} //end if else
		})
		.catch((error) => {
			//DB error
			console.log(error);
			res.status(500).json({
				error: 'There was an error while saving the comment to the database',
			});
		});
});

// When the client makes a `PUT` request to `/api/posts/:id`:
router.put('/:id', (req, res) => {
	if (!req.body.title || !req.body.contents) {
		return res.status(400).json({
			errorMessage: 'Please provide title and contents for the post.',
		});
	}
	posts
		.update(req.params.id, req.body)
		.then((post) => {
			if (post) {
				res.status(200).json(post);
			} else {
				res.status(404).json({
					message: 'The post with the specified ID does not exist.',
				});
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				error: 'The post information could not be modified.',
			});
		});
});

//delete a post by its ID
router.delete('/:id', (req, res) => {
	posts
		.remove(req.params.id)
		.then((post) => {
			if (post) {
				//if that id to delete was found in DB
				res.status(200).json(post);
			} else {
				res.status(404).json({
					message: 'The post with the specified ID does not exist.',
				});
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: 'The post could not be removed',
			});
		});
});

// export the new router
module.exports = router;
