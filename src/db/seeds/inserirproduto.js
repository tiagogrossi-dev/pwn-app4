/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex("produto").del();
    await knex("produto").insert([
      {
        descricao: "Caneca p/ sublimação 325ml",
        valor: 35.00,
        marca: 'Jojo'
      },
      {
        descricao: "Caneca p/ sublimação 325ml",
        valor: 35.00,
        marca: 'Live'
      },
    ]);
  };