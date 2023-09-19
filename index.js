const express = require('express');

const http = require('http');

const routes = require('./router');

const app = express();

const server = http.createServer(app);

const { PORT } = require('./config');

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

app.use('/', routes);

app.set('view engine', 'ejs');