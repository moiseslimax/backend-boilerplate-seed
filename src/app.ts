import "reflect-metadata";
import express, { Response as ExResponse } from "express";
import bodyParser from "body-parser";
import { createConnection } from "typeorm";
import routes from "./routes";
import { Server } from "http";

import cors from "cors";

// if (process.env.NODE_ENV !== "test") {
//   createConnection()
//     .then(async (connection) => {
//       console.log(!connection.isConnected ? "não conectado" : "CONECTADO");
//     })
//     .catch((error) => console.log(error));
// }

const app = express();

app.use(express.json({ limit: "10mb" }), cors(), routes);

app.use(bodyParser.json({ limit: "10mb" }));

app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: "Not Found",
  });
});

const port = process.env.PORT || 8080;
if (process.env.NODE_ENV !== "test") {
  const server: Server = app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
}

export default app;
