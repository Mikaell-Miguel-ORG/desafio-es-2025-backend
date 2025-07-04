const {Router, response} = require("express");
const TasksController = require("../controllers/TasksController");

const tasksRouter = Router();
const tasksController = new TasksController();

// 1. Criar Tarefa
tasksRouter.post("/", tasksController.create);
// 2. Listar Tarefas
tasksRouter.get("/", tasksController.index);
// 3. Buscxar Tarefa por ID
tasksRouter.get("/:id", tasksController.show);
// 4. Atualizar Tarefa por ID
tasksRouter.put("/:id", tasksController.update);


module.exports = tasksRouter;