const {Router} = require("express");
const tasksRouter = require("./tasks.routes");

const routes = Router();

routes.use("/tarefas", tasksRouter);

module.exports = routes;