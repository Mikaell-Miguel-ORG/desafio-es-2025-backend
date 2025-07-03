const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const isValidDateFormat = require("../utils/isValidDateFormat");

class TasksController {
    async create(request, response) {

        const {titulo, descricao, status, prioridade, data_vencimento} = request.body;

        // Validações de entrada do usuário
        if(!titulo) throw new AppError("A Tarefa deve conter um Título");
        if(!status) throw new AppError("A Tarefa deve possuir um Status");
        if(!["pendente", "concluída", "realizando"].includes(status)) throw new AppError("Deve ser fornecido um Status Válido (pendente, concluída, realizando)");
        if(data_vencimento && !isValidDateFormat(data_vencimento)) throw new AppError("Deve ser fornecido uma data de vencimento válida!");
        if(!["alta", "média", "baixa"].includes(prioridade)) throw new AppError("Deve ser fornecido uma prioridade válida (alta, média, baixa)");

        await knex("tasks").insert({
            title: titulo,
            description: descricao,
            status,
            priority: prioridade,
            due_date: data_vencimento
        });

        // Respondendo com o codígo (created)
        response.status(201).json();
    }
}

module.exports = TasksController;