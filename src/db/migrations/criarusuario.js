/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.createTable("usuarios", function (table) {
      table.increments().primary();
      table.string("nome", 200).notNullable();
      table.string("email", 200).notNullable();
      table.string("login", 20).notNullable();
      table.string("senha", 250).notNullable();
      table.string("roles", 10).notNullable().defaultTo("USER");
      table.timestamp("atualizado_em").defaultTo(knex.fn.now());
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("usuarios");
  };