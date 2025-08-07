
jest.mock('../database/knex', () => jest.fn());
const TasksController = require('./TasksController');
const AppError = require('../utils/AppError');
const knex = require('../database/knex');

describe('TasksController', () => {
    let controller;
    let req;
    let res;
    beforeEach(() => {
        controller = new TasksController();
        req = { body: {}, params: {}, query: {} };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        knex.mockClear();
    });

    describe('create', () => {
        it('deve criar uma tarefa válida', async () => {
            req.body = { titulo: 'Teste', descricao: 'desc', status: 'pendente', data_vencimento: '2025-08-06' };
            knex.mockReturnValue({ insert: jest.fn().mockResolvedValueOnce([1]) });
            await controller.create(req, res);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalled();
        });
        it('deve lançar erro se faltar título', async () => {
            req.body = { status: 'pendente' };
            await expect(controller.create(req, res)).rejects.toThrow(AppError);
        });
        it('deve lançar erro se status for inválido', async () => {
            req.body = { titulo: 'Teste', status: 'errado' };
            await expect(controller.create(req, res)).rejects.toThrow(AppError);
        });
    });
});
