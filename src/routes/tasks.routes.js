const {Router, response} = require("express");
const TasksController = require("../controllers/TasksController");

const tasksRouter = Router();
const tasksController = new TasksController();

// 1. Criar Tarefa
tasksRouter.post("/", tasksController.create);

tasksRouter.get("/", (request, response) => {
    if(request.query.status){
        return tasksController.filterByStatus(request, response); // 6. Filtar por status
    }

    return tasksController.index(request, response); // 2. Listar todas as tarefas
});

// 3. Buscxar Tarefa por ID
tasksRouter.get("/:id", tasksController.show);
// 4. Atualizar Tarefa por ID
tasksRouter.put("/:id", tasksController.update);
// 5. Deletar Tarefa por ID
tasksRouter.delete("/:id", tasksController.delete);

module.exports = tasksRouter;