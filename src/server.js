const Express = require('express');
const { createServer } = require('http');
const dotenv = require('dotenv');
const { router } = require('./routes/router')
const cors = require('cors');

dotenv.config({ path: "/.env" });

const port = process.env.PORT || 3000;

const app = Express();
app.use(cors());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.json());

app.use(router);

const server = createServer(app)

server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});