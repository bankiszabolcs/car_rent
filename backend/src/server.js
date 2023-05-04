const express = require("express");
const morgan = require("morgan");
const logger = require("./config/logger");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./docs/swagger.yaml");
require("dotenv").config();
const authHandler = require("./auth/authHandler");
const config = require("config");
const { join } = require("path");

const angularAppPath = join(__dirname, "../public/angular");

const app = express();
const apiWrapper = express();
apiWrapper.use("/api", app);
app.use(cors(config.cors));
app.use(express.json());

app.use(morgan("tiny", { stream: logger.stream }));

app.post("/login", authHandler.login);
app.post("/refresh", authHandler.refresh);
app.post("/logout", authHandler.logout);
app.get("/me", authHandler.me);
app.use("/users", require("./controllers/user/user.routes"));
app.use("/orders", require("./controllers/order/order.routes"));
app.use("/cars", require("./controllers/car/car.routes"));

apiWrapper.use("/", express.static(angularAppPath));
apiWrapper.get("*", (req, res) => {
  res.sendFile(angularAppPath + "/index.html");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err, req, res, next) => {
  logger.error(`${err.statusCode}: ${err.message}`);
  res.status(err.statusCode);
  res.json({
    hasError: true,
    message: err.message,
  });
});

module.exports = apiWrapper;
