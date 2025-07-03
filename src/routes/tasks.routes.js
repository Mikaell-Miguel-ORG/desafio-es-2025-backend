const {Router, response} = require("express");
const TasksController = require("../controllers/TasksController");

const tasksRouter = Router();
const tasksController = new TasksController();

// 1. Criar Tarefa
tasksRouter.post("/", tasksController.create);


module.exports = tasksRouter;