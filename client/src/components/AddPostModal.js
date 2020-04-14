import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../actions/postAction';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import Moment from 'react-moment';

const AddPostModal = ({ addPost }) => {
	const [title, setTitle] = useState('');
	const [contents, setContents] = useState('');
	const [created, setCreated] = useState('');
	const [updated, setUpdated] = useState('');

	const onSubmit = () => {
		if (title === '' || contents === '') {
			M.toast({ html: 'Please enter information in all fields' });
		} else {
			const newPost = {
				title,
				contents,
				created,
				updated,
			};
			console.log(newPost);
			addPost(newPost);

			// Clear Fields
			setTitle('');
			setContents('');
		}
	};
	const dateToFormat = Date.now();

	return (
		<div id='add-post-modal' className='modal' style={modalStyle}>
			<div className='modal-content'>
				<h4>Enter New Post</h4>
				<div className='row'>
					<div className='input-field'>
						<input
							type='text'
							title='title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<label htmlFor='title' className='active'>
							Blog Title
						</label>
					</div>
				</div>

				<div className='row'>
					<div className='input-field'>
						<input
							type='text'
							name='contents'
							value={contents}
							onChange={(e) => setContents(e.target.value)}
						/>
						<label htmlFor='contents' className='active'>
							Contents
						</label>
					</div>
				</div>
				<div className='row'>
					Created at: <Moment value={created}>{dateToFormat}</Moment>
				</div>
				<div className='row'>
					Updated at: <Moment value={updated}>{dateToFormat}</Moment>
				</div>
			</div>
			<div className='modal-footer'>
				<a
					href='#!'
					onClick={onSubmit}
					className='modal-close waves-effect blue waves-light btn'
				>
					Enter
				</a>
			</div>
		</div>
	);
};

const modalStyle = {
	width: '75%',
	height: '75%',
};

export default connect(null, { addPost })(AddPostModal);
