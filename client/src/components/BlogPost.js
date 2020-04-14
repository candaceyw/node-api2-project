import React from 'react';
import { connect } from 'react-redux';
import { deletePost, setCurrent } from '../actions/postAction.js';
import M from 'materialize-css/dist/js/materialize.min.js';

const BlogPost = (props) => {
	const onDelete = () => {
		props.deletePost(props.id);
		M.toast({ html: 'post deleted' });
	};

	return (
		<li className='collection-item'>
			<div key={props.id}>
				{/* <a href='#edit-user-modal' className='modal-trigger' onClick={() => setCurrent(user)}><h2>{name}</h2></a>
				 */}
				<div>
					<div>
						<br />
						<span className='grey-text'>
							<span className='black-text'>Title: {props.title}</span>
							<br />
							<span className='black-text'>Contents: {props.contents}</span>
						</span>
						<span className='black-text'>Date Created: {props.created}</span>
						<br />
						<span className='black-text'>Date Updated: {props.updated}</span>
						{/* </span> */}
						<a href='#!' onClick={onDelete} className='secondary-content'>
							<i className='material-icons grey-text'>delete</i>
						</a>
					</div>
				</div>
			</div>
		</li>
	);
};

export default connect(null, { deletePost, setCurrent })(BlogPost);
