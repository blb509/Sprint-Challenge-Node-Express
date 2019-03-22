const express = require("express");

const projectsRouter = require("./data/routers/projects-router.js");
const actionsRouter = require("./data/routers/actions-router.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
    <p>Hi</p>
  `);
});

server.use("/api", actionsRouter);

module.exports = server;
