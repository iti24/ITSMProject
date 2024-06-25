require("dotenv").config();
const config = {
  port: process.env.PORT,
  mongodbUri: process.env.MONGODB_URI,
  
};
module.exports = config;
