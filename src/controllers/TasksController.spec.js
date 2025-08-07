
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

    describe('index', () => {
        it('deve retornar todas as tarefas', async () => {
            knex.mockReturnValue({ select: jest.fn().mockResolvedValueOnce([{ id: 1 }]) });
            await controller.index(req, res);
            expect(res.json).toHaveBeenCalledWith([{ id: 1 }]);
        });
    });

    describe('show', () => {
        it('deve retornar uma tarefa pelo id', async () => {
            req.params = { id: 1 };
            knex.mockReturnValue({ where: jest.fn().mockReturnValue({ first: jest.fn().mockResolvedValueOnce({ id: 1 }) }) });
            await controller.show(req, res);
            expect(res.json).toHaveBeenCalledWith({ id: 1 });
        });
        it('deve lançar erro se não encontrar tarefa', async () => {
            req.params = { id: 2 };
            knex.mockReturnValue({ where: jest.fn().mockReturnValue({ first: jest.fn().mockResolvedValueOnce(undefined) }) });
            await expect(controller.show(req, res)).rejects.toThrow(AppError);
        });
    });

    describe('update', () => {
        it('deve atualizar uma tarefa existente', async () => {
            req.params = { id: 1 };
            req.body = { titulo: 'Novo', status: 'concluída' };
            const mockTask = { id: 1, title: 'Antigo', status: 'pendente' };
            knex.mockReturnValueOnce({ where: jest.fn().mockReturnValue({ first: jest.fn().mockResolvedValueOnce(mockTask) }) })
                .mockReturnValueOnce({ where: jest.fn().mockReturnValue({ update: jest.fn().mockResolvedValueOnce() }) });
            await controller.update(req, res);
            expect(res.json).toHaveBeenCalled();
        });
        it('deve lançar erro se status for inválido', async () => {
            req.params = { id: 1 };
            req.body = { status: 'errado' };
            knex.mockReturnValue({ where: jest.fn().mockReturnValue({ first: jest.fn().mockResolvedValueOnce({}) }) });
            await expect(controller.update(req, res)).rejects.toThrow(AppError);
        });
        it('deve lançar erro se não encontrar tarefa', async () => {
            req.params = { id: 2 };
            knex.mockReturnValue({ where: jest.fn().mockReturnValue({ first: jest.fn().mockResolvedValueOnce(undefined) }) });
            await expect(controller.update(req, res)).rejects.toThrow(AppError);
        });
    });
});
