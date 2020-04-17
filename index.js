const express = require('express');
const postRouter = require('./routes/Router');
const cors = require('cors');

const server = express();
const port = process.env.PORT || 4400;

server.use(express.json());
server.use(cors());

server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
	res.send(`
  <h1>Welcome to our Posts-Data Server, ${process.env.AUTHKEY}</h1>
  `);
});

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
