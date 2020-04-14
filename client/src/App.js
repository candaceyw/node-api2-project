import React, { useEffect } from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import Blog from './components/Blog';
import AddBtn from './components/layout/AddBtn';
import AddPostModal from './components/AddPostModal';

function App() {
	useEffect(() => {
		// Init Materialize JS
		M.AutoInit();
	});

	return (
		<div className='App'>
			<Blog />
			<AddPostModal />
			<AddBtn />
		</div>
	);
}

export default App;
