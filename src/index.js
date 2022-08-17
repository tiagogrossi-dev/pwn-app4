const express = require("express");
const morgan = require("morgan");

const port = process.env.PORT || 3000;

//ROUTES
const routesApi = require("./api");
const routesSite = require("./pag")
const routesAuth = require("./api/auth")

const app = express();
app.use(express.json());

app.use(morgan("tiny"));
app.use("/api", routesApi);
app.use("/pag", routesSite);
app.use("/auth", routesAuth);

app.get("/", function (_req, res) {

  res.send(`
    <section style="margin: 2rem; text-align: center">
      <div style="display: flex; flex-direction: column">
        <a href="https://pwn-tgs-app4.herokuapp.com/pag/">Acesse aqui</a>
      </div>
    </section>
  `);

});

app.listen(port, () => {
  console.info(`..::### Servidor Operando normalmente na porta ${port} ###::..`);
});