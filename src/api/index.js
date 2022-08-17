require("dotenv").config();
const express = require("express");
const knex = require("../db/knex");
const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    res.status(403).json({ message: "Ops... Token requerida!" }).end();
  } else {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ENV_SECRET_KEY, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Ops... Token invalida!" }).end();
      } else {
        req.token = decodedToken;
        req.userId = decodedToken.id;
        next();
      }
    });
  }
};

const isAdmin = (req, res, next) => {
  knex("usuarios")
    .where({ id: req.userId })
    .first()
    .then((usuario) => {
      if (usuario) {
        let roles = usuario.roles.split(";");
        let adminRole = roles.find((i) => i === "ADMIN");
        if (adminRole === "ADMIN") {
          next();
          return;
        } else {
          res.status(403).json({ message: "Ops... Role de ADMIN requerida" });
          return;
        }
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Ops... Erro ao verificar roles de usuário - " + err.message,
      });
    });
};

// const knex = require ('knex') ({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false
//     },
//   }
// })

const routesApi = express.Router();

routesApi.post("/produto", checkToken, isAdmin, (req, res) => {
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


routesApi.get("/produto/:id",checkToken, (req, res) => {
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


routesApi.put("/produto/:id", checkToken, isAdmin, (req, res) => {
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


routesApi.delete("/produto/:id", checkToken, isAdmin, (req, res) => {
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
