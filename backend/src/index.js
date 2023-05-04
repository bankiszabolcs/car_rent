const app = require("./server");
const config = require("config");
const logger = require("./config/logger");
const mongoose = require("mongoose");
const port = config.port;

const { username, password, host } = config.get("database");

mongoose
  .connect(
    `mongodb+srv://${config.database.user}:${config.database.password}@${config.database.host}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  //.connect(`mongodb://${config.database.host}`)
  .then(() => logger.info("MongoDB connection is successful"))
  .catch((err) => {
    console.log(err);
    logger.error(err);
    process.exit();
  });

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
