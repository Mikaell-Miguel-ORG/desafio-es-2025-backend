const {Router, response} = require("express");

const tasksRouter = Router();

// 1. Criar Tarefa
tasksRouter.post("/", (request, response) => {
    response.status(201).json({
        message: "Tarefa criada com sucesso!"
    });
}); 


module.exports = tasksRouter;