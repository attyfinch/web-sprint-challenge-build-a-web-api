const express = require('express');
const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json())
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.json({message: "Let's get to work"})
})

module.exports = server;
