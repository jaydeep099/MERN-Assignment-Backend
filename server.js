const express = require("express");
const bodyParser = require("body-parser");
const { loggingRequest } = require("./middleware/logger");
const { dbConnect } = require("./config/database");
const path = require("path");
const router = require("./routes");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(loggingRequest);
app.use(
  cors({
    origin: "*",
  })
);
app.use("/uploads", express.static(path.join(__dirname, "/upload/images")));

app.use("/api", router);

dbConnect()
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is at http://localhost:${PORT}`);
});
