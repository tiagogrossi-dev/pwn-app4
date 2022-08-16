/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.createTable("produto", function (table) {
      table.increments().primary();
      table.string("descricao", 200).notNullable();
      table.decimal("valor").notNullable();
      table.string("marca", 200).notNullable();
      table.timestamp("atualizado_em").defaultTo(knex.fn.now());
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("produto");
  };