const express = require("express");
const morgan = require("morgan");

const port = process.env.PORT || 3000;

//ROUTES
const routesApi = require("./api");

const app = express();
app.use(express.json());

app.use(morgan("tiny"));
app.use("/api", routesApi);

app.listen(port, () => {
  console.info(`..::### Servidor Operando normalmente na porta ${port} ###::..`);
});
