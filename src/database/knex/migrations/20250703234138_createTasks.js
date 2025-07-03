/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = knex => knex.schema.createTable("tasks", table => {
    table.increments("id");
    table.text("title");
    table.text("description");
    table.text("status");
    table.date("due_date").nullable();
})
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = knex => knex.schema.dropTable("tasks");