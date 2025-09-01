const mongoose = require("mongoose");
require("dotenv").config();

const  dbUrl = process.env.DATABASE_URL
async function dbConnect() {
 return await mongoose.connect(dbUrl);
}

module.exports = { dbConnect };
