const request = require('supertest');
const app = require('../../src/server');
const knex = require('../../src/database/knex');

describe('Tasks Integration', () => {
  let consoleSpy;

  beforeAll(() => {
   consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });
  beforeAll(async () => {
    await knex.migrate.latest();
  });

  afterAll(async () => {
    await knex('tasks').del();
    await knex.destroy();
  });

  let taskId;

  it('deve criar uma tarefa', async () => {
    const res = await request(app)
      .post('/tarefas')
      .send({
        titulo: 'Teste',
        descricao: 'Descrição de teste',
        status: 'pendente',
        data_vencimento: '2025-08-10'
      });
    expect(res.statusCode).toBe(201);
  });

  it('deve listar tarefas', async () => {
    const res = await request(app).get('/tarefas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    if (res.body.length > 0) taskId = res.body[0].id;
  });

  it('deve buscar tarefa por id', async () => {
    if (!taskId) return;
    const res = await request(app).get(`/tarefas/${taskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(taskId);
  });

  it('deve atualizar tarefa', async () => {
    if (!taskId) return;
    const res = await request(app)
      .put(`/tarefas/${taskId}`)
      .send({ status: 'concluída' });
    expect(res.statusCode).toBe(200);
  });

  it('deve filtrar tarefas por status', async () => {
    const res = await request(app).get('/tarefas?status=concluida');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('deve deletar tarefa', async () => {
    if (!taskId) return;
    const res = await request(app).delete(`/tarefas/${taskId}`);
    expect(res.statusCode).toBe(200);
  });
});
