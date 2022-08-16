require("dotenv").config();
const express = require("express");

const knex = require ('knex') ({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
  }
})

const routesApi = express.Router();

routesApi.post("/produto", (req, res) => {
  const { descricao, valor, marca } = req.body;

  if (!descricao || !valor || !marca) {
    return res.status(400).json({ error: "Está faltando dados a serem preenchidos!" });
  }

  const criarProduto = {
    descricao,
    valor,
    marca,
  };

  return knex("produto")
    .insert(criarProduto, "*")
    .then((produto) => res.status(201).json(produto))
    .catch((err) => {
      res.status(500).json({
        message: `Ocorreu erro, ${err.message}`,
      });
    });
});

routesApi.get("/produto", (req, res) => {
  return knex("produto")
    .then((produto) => res.json(produto))
    .catch((err) => {
      res.status(500).json({
        message: `Ocorreu erro, ${err.message}`,
      });
    });
});


routesApi.get("/produto/:id", (req, res) => {
  let { id } = req.params;

  return knex("produto")
    .where({ id })
    .first()
    .then((produto) => res.json(produto))
    .catch((err) => {
      res.status(500).json({
        message: `Ocorreu erro, ${err.message}`,
      });
    });
});


routesApi.put("/produto/:id", (req, res) => {
  const { id } = req.params;
  const { descricao, valor, marca } = req.body;
  const atualizado_em = knex.fn.now();

  return knex("produto")
    .where({ id })
    .update(
      {
        descricao,
        valor,
        marca,
        atualizado_em,
      },
      "*"
    )
    .then((produto) => {
      if (produto && produto[0]) {
        res.status(200).json(produto);
      } else {
        res.status(400).json({ error: "Produto não localizado!" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `Ocorreu erro, ${err.message}`,
      });
    });
});


routesApi.delete("/produto:id", (req, res) => {
  const { id } = req.params;

  return knex("produto")
    .where({ id })
    .del("*")
    .then((produto) => {
      if (produto && produto[0]) {
        res.status(200).json(produto);
      } else {
        res.status(400).json({ error: "Produto não localizado!" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: `Ocorreu erro, ${err.message}`,
      });
    });
});

module.exports = routesApi;
