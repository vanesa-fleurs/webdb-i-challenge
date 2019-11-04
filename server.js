const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

const accountsRouter = require('./accounts/accounts-router.js')
server.use('/api/accounts', accountsRouter)

server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda WEP DB Challenge :)</h>
      <p>Let's get started... </p>
    `);
});

module.exports = server;