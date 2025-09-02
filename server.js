const app = require("./app");
const { dbConnect } = require("./config/database");
require("dotenv").config();

dbConnect()
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is at http://localhost:${PORT}`);
});
